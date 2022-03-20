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

export default function ProgramContainer(props){
    return(
        <div className='programContainer'>
          {/* {props.channelItem.program[0]} */}
          <PortableText value={props.channelItem.program}
                        components={myPortableTextComponents}
/>
        </div>
      )
}