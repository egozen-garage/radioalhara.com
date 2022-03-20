import '../style/ProgramContainer.css'
import {PortableText} from '@portabletext/react'


const myPortableTextComponents = {
    // types: {
    //   image: ({value}) => <img src={value.imageUrl} />,
    //   callToAction: ({value, isInline}) =>
    //     isInline ? (
    //       <a href={value.url}>{value.text}</a>
    //     ) : (
    //       <div className="callToAction">{value.text}</div>
    //     ),
    // },
  
    marks: {
      link: ({children, value}) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <a href={value.href} rel={rel}>
            {children}
          </a>
        )
      },
    },
  }

const ProgramText = (channelItem) => {
    return(
        <div className="CollapsibleContainer">
          <input id="event" className="toggle" type="checkbox"/>
          <label htmlFor="event" className="collapsible">
            <span> programme today 
              <span id="arrow-right">&#8594;</span>
              <span id="arrow-down">&#8600;</span>
            </span>
          </label>
          <div className='programContainer'>
            {/* {props.channelItem.program[0]} */}
            <PortableText value={channelItem.channelItem.program}
                          components={myPortableTextComponents} />
          </div>
        </div>
      )
}
const NoProgramText = () => {
    return <div></div>
}

export default function ProgramContainer(props){
    const programIsTrue = props.channelItem.program;
    if (programIsTrue) {
        return <ProgramText channelItem={props.channelItem}/>;
    }
    return <NoProgramText />;
}