import { Component, OnInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'alhara';

  // // 2. pass then in constructor
  // constructor(
  //   private renderer2: Renderer2,
  //   @Inject(DOCUMENT) private _document:any
  // ) {
  // }


  // // 3. call them in ngOnInit
  ngOnInit() {
  // const s = this.renderer2.createElement('script');
  // s.type = 'text/javascript';
  // s.src = 'https://t.me/alharatesting';
  // s.text = ``;
  // // s.data-telegram-discussion = 'durov/126';
  // // s.data-comments-limit = '5';
  // s.hallo = '';
  // this.renderer2.appendChild(this._document.body, s);
  }

}


