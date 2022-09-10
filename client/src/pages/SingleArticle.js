import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

import SingleArticleItem from "../components/SingleArticleItem";

import MessageHook from "../utils/messageHook";


const SingleArticle = () => {
    const { slug } = useParams();
    const [ article, setArticle ] = useState(false);
    const [ message, setMessage ] = MessageHook();

    useEffect(() => {
        fetch(`/api/article/${slug}`, {credentials: "include"})
            .then(r => r.json().then(data => ({ ok: r.ok, status: r.status, statusText: r.statusText, body: data})) ) // package status and json body into return result
            .then((data) => {

                if ( data.ok ) {
                    setArticle( data.body );
                
                } else if ( data.body.result === "error" && data.body.message ) {
                    setMessage( { type:"error", content: data.body.message } );

                } else {
                    setMessage( { type: "error", content: `${data.status} - ${data.statusText}` } );
                }
                
            })
            .catch((error) => {
                console.log(error);
                setMessage( { type:"error", content: error.message } );
            });
 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    return (
        <Box>
            {article === false
                ? <><br /><br /><br /><CircularProgress size="1.4rem" /> loading article...</>
                : <SingleArticleItem article={article} />
            }

            {message !== false && message}
        </Box>
    );
}

export default SingleArticle;