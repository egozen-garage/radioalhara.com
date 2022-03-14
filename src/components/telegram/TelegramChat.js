import React, {useState} from "react";
import {
    Alert,
    AlertIcon,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Center,
    CloseButton,
    Heading,
    Image,
    Stack
} from "@chakra-ui/react";
// import {PortableText, urlFor} from "../utility/sanity";
// import Link from 'next/link';
// import Team from "./Team";
// import {toHtmlFormat} from "../utility/objectFormat";
// import {formatDate} from "../utility/dateFormat";
// import {makePostRequest} from "../utility/api";
import { makePostRequest } from "../../utility/api";


const TelegramChat = ({movie}) => {
    // const [shouldShowAlert, setShouldShowAlert] = useState(false);
    // const [alertContent, setAlertContent] = useState(null);

    // const hideAlert = () => {
    //     setAlertContent(null);
    //     setShouldShowAlert(false);
    // };

    // const formattedReleaseDate = formatDate(movie.releaseDate);

    // const getDetailsFromCastMember = ({characterName, person}) =>
    //     `${person.name} as ${characterName}`;

    // const getDetailsFromCrewMember = ({job, person}) =>
    //     `${person.name} - ${job}`;
    let title = "first post"
    let messageToSend = "hello from radio alhara";

    const sendMovieInfoToUser = async () => {
        // const {cast, crew, popularity, overview, title} = movie;
        const detailsToSend = {
            message: messageToSend,
            // releaseDate: formattedReleaseDate,
            // cast: cast.map(getDetailsFromCastMember),
            // crew: crew.map(getDetailsFromCrewMember),
            // popularity,
            // summary: overview[0].children[0].text
        };

        const response = await makePostRequest("/api/share", {
            text: toHtmlFormat(title, detailsToSend),
            parseMode: 'html'
        });

        setAlertContent(response.message);
        setShouldShowAlert(true);
        setTimeout(hideAlert, 3000);
    }

    return (

        <Button
            colorScheme="teal"
            variant="outline"
            mt='1'
            onClick={sendMovieInfoToUser}
        >
            Share details via Telegram
        </Button>
                                
    );

};

export default TelegramChat;