import ArticleList from "../components/ArticleList";
import HomeSplash from "../components/HomeSplash";

import MessageHook from "../utils/messageHook";

const Home = ({dispatchAuth}) => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') || false;
    const showLoginSuccessfulOnHome = sessionStorage.getItem('showLoginSuccessfulOnHome') || false;
    const [ message, setMessage ] = MessageHook();

    if ( showLoginSuccessfulOnHome ) {
        // when login from widget on Home this message was not displayed here when set in Login component
        setMessage({type:"success", content:"You have logged in!"});
        sessionStorage.removeItem('showLoginSuccessfulOnHome');
    }

    return (
        <>
            <h1>Home</h1>
            {isAuthenticated ? <ArticleList /> : <HomeSplash dispatchAuth={dispatchAuth} /> }

            {message !== false && message}
        </>
    );

}

export default Home;