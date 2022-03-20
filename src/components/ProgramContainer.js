import '../style/ProgramContainer.css'

export default function ProgramContainer(props){
    return(
        <div className='programContainer'>
          {props.channelItem.program}
        </div>
      )
}