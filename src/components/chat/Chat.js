import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import './chat.css';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
const ADMIN_TOKEN = process.env.REACT_APP_ADMIN_TOKEN;
const ADMIN_NAME = 'Radio alHara';
const CHANNEL_NAME = 'radioalhara-live';
const MAX_MESSAGES = 100;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const AVATAR_COLORS = [
  '#794DFF', '#FF4D4D', '#4DAAFF', '#FF9F4D',
  '#4DFF91', '#FF4DAA', '#FFD94D', '#4DFFE0',
];

function avatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getStored(key) {
  try { return localStorage.getItem(key) || null; } catch { return null; }
}
function setStored(key, val) {
  try { localStorage.setItem(key, val); } catch {}
}

function Avatar({ name, size = 32, onClick, clickable, title: titleProp }) {
  if (name === ADMIN_NAME) {
    return (
      <div
        className={`rh-avatar rh-avatar--radio${clickable ? ' rh-avatar--clickable' : ''}`}
        style={{ width: size, height: size }}
        title={titleProp || name}
        onClick={onClick}
      >
        <img src="/img/radio-alhara-logo.svg" alt="Radio alHara" />
      </div>
    );
  }
  const letter = name ? name[0].toUpperCase() : '?';
  const bg = avatarColor(name || '?');
  return (
    <div
      className={`rh-avatar${clickable ? ' rh-avatar--clickable' : ''}`}
      style={{ width: size, height: size, background: bg, color: '#000', fontSize: size * 0.4 }}
      title={titleProp || (clickable ? 'Change name' : name)}
      onClick={onClick}
    >
      {letter}
    </div>
  );
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

function NicknameScreen({ onSet }) {
  const [value, setValue] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = value.trim().slice(0, 24);
    if (!name) return;
    const isAdminName = name.toLowerCase() === 'radio alhara';
    if (isAdminName) {
      if (token === ADMIN_TOKEN) {
        setStored('rh_nickname', ADMIN_NAME);
        setStored('rh_is_admin', 'true');
        onSet(ADMIN_NAME, true);
      } else {
        setError('wrong token');
      }
      return;
    }
    setStored('rh_nickname', name);
    setStored('rh_is_admin', 'false');
    onSet(name, false);
  };

  return (
    <div id="rh-nickname-screen">
      <form onSubmit={handleSubmit} id="rh-nickname-form">
        <input
          type="text"
          placeholder="pick a name..."
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(''); }}
          maxLength={24}
          autoFocus
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="admin token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="rh-token-input"
        />
        {error && <div className="rh-nickname-error">{error}</div>}
        <button type="submit">JOIN</button>
      </form>
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [nickname, setNickname] = useState(getStored('rh_nickname'));
  const [isAdmin, setIsAdmin] = useState(getStored('rh_is_admin') === 'true');
  const [renaming, setRenaming] = useState(false);
  const [renameInput, setRenameInput] = useState('');
  const renameRef = React.useRef(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Load recent messages
  useEffect(() => {
    supabase
      .from('messages')
      .select('*')
      .eq('channel', CHANNEL_NAME)
      .order('created_at', { ascending: true })
      .limit(MAX_MESSAGES)
      .then(({ data }) => { if (data) setMessages(data); });
  }, []);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `channel=eq.${CHANNEL_NAME}` },
        (payload) => setMessages((prev) => [...prev.slice(-(MAX_MESSAGES - 1)), payload.new])
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'messages' },
        (payload) => setMessages((prev) => prev.filter((m) => m.id !== payload.old.id))
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input after nickname set
  useEffect(() => {
    if (nickname) setTimeout(() => inputRef.current?.focus(), 150);
  }, [nickname]);

  const handleNicknameSet = (name, admin) => {
    setNickname(name);
    setIsAdmin(admin);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || !nickname) return;
    setInput('');
    await supabase.from('messages').insert({
      channel: CHANNEL_NAME,
      nickname,
      text,
      type: isAdmin ? 'admin' : 'user',
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSend(e);
  };

  const handleRename = (e) => {
    e.preventDefault();
    const name = renameInput.trim().slice(0, 24);
    if (!name) { setRenaming(false); return; }
    // Block claiming admin name without token
    if (name.toLowerCase() === ADMIN_NAME.toLowerCase()) { setRenaming(false); return; }
    setStored('rh_nickname', name);
    setStored('rh_is_admin', 'false');
    setNickname(name);
    setIsAdmin(false);
    setRenaming(false);
    setRenameInput('');
  };

  const handleLogout = () => {
    setStored('rh_nickname', null);
    setStored('rh_is_admin', 'false');
    localStorage.removeItem('rh_nickname');
    localStorage.removeItem('rh_is_admin');
    setNickname(null);
    setIsAdmin(false);
    setRenaming(false);
  };

  const handleDelete = async (id) => {
    await supabase.from('messages').delete().eq('id', id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div id="rh-chat-root">
      <div id="rh-chat-messages">
        {messages.length === 0 && (
          <div className="rh-chat-empty">no messages yet</div>
        )}
        {messages.map((msg) => {
          const isOwn = msg.nickname === nickname;
          const isAdminMsg = msg.type === 'admin' || msg.nickname === ADMIN_NAME;
          const isSystem = msg.type === 'system';

          if (isSystem) {
            return (
              <div key={msg.id} className="rh-chat-row rh-chat-row--system">
                <div className="rh-avatar rh-avatar--system">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9"/>
                    <ellipse cx="12" cy="12" rx="4" ry="7"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                  </svg>
                </div>
                <div className="rh-chat-bubble rh-chat-bubble--system">
                  <div className="rh-system-label">NEXT:</div>
                  <div className="rh-system-body">{msg.text}</div>
                  <span className="rh-chat-time">{formatTime(msg.created_at)}</span>
                </div>
                {isAdmin && (
                  <button className="rh-delete-btn" onClick={() => handleDelete(msg.id)} title="Delete">×</button>
                )}
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`rh-chat-row ${isOwn ? 'rh-chat-row--own' : ''} ${isAdminMsg ? 'rh-chat-row--admin' : ''}`}
            >
              {!isOwn && <Avatar name={msg.nickname} />}
              <div className={`rh-chat-bubble ${isOwn ? 'rh-chat-bubble--own' : ''} ${isAdminMsg ? 'rh-chat-bubble--admin' : ''}`}>
                {isAdminMsg && !isOwn && (
                  <div className="rh-admin-label">Radio alHara</div>
                )}
                <span className="rh-chat-text">{msg.text}</span>
                <span className="rh-chat-time">{formatTime(msg.created_at)}</span>
              </div>
              {isOwn && <Avatar name={msg.nickname} />}
              {isAdmin && (
                <button className="rh-delete-btn" onClick={() => handleDelete(msg.id)} title="Delete">×</button>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div id="rh-chat-input-area">
        {!nickname ? (
          <NicknameScreen onSet={handleNicknameSet} />
        ) : (
          <div id="rh-chat-send-form-wrapper">
            {renaming && (
              <form id="rh-rename-form" onSubmit={handleRename}>
                <input
                  ref={renameRef}
                  type="text"
                  placeholder="new name..."
                  value={renameInput}
                  onChange={(e) => setRenameInput(e.target.value)}
                  onBlur={() => { setRenaming(false); setRenameInput(''); }}
                  onKeyDown={(e) => e.key === 'Escape' && setRenaming(false)}
                  maxLength={24}
                  autoComplete="off"
                  autoFocus
                />
              </form>
            )}
            <form id="rh-chat-send-form" onSubmit={handleSend}>
              <Avatar
                name={nickname}
                size={28}
                onClick={() => {
                  if (isAdmin) {
                    handleLogout();
                  } else {
                    setRenaming(true);
                    setRenameInput('');
                    setTimeout(() => renameRef.current?.focus(), 50);
                  }
                }}
                clickable
                title={isAdmin ? 'Sign out' : 'Change name'}
              />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={300}
                autoComplete="off"
              />
              <button type="submit" id="rh-chat-send-btn">↑</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
