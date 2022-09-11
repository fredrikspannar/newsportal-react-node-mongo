import { DiTechcrunch } from "react-icons/di";
import { RiArticleFill }  from "react-icons/ri";
import { BsYoutube } from "react-icons/bs";
import { SiCnn, SiTelegraph } from "react-icons/si";

const getArticleIcon = (source) => {
    let headerIcon = null;

    switch( source.toLowerCase() ) {
        case 'techcrunch': headerIcon = <DiTechcrunch/>
                           break;

        case 'youtube': headerIcon = <BsYoutube/>
                           break;

        case 'cnn': headerIcon = <SiCnn/>
                           break;

        case 'telegraph.co.uk': headerIcon = <SiTelegraph/>
                           break;

        default: headerIcon = <RiArticleFill />
    }

    return headerIcon;
}

export default getArticleIcon;