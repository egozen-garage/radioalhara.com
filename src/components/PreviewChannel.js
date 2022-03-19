import { Link } from "react-router-dom";

// export const PreviewChannel = (channel) => {
export default function PreviewChannel(channel){
    return (
        <li> 
            {/* <Link to={"/" + channel.slug.current}> */}
            <Link to={channel.slug}>
                <h3>{channel.title}</h3>
            </Link>
        </li>
    )
}


