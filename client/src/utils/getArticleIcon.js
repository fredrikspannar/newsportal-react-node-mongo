import { DiTechcrunch } from "react-icons/di";
import { RiArticleFill }  from "react-icons/ri";

const getArticleIcon = (source) => {
    let headerIcon = null;

    switch( source.toLowerCase() ) {
        case 'techcrunch': headerIcon = <DiTechcrunch/>
                           break;

        default: headerIcon = <RiArticleFill />
    }

    return headerIcon;
}

export default getArticleIcon;