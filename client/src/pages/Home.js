import ArticleList from "../components/ArticleList";
import HomeSplash from "../components/HomeSplash";

import MessageHook from "../utils/messageHook";

const Home = ({dispatchAuth}) => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') || false;
    const showLoginSuccessfulOnHome = sessionStorage.getItem('showLoginSuccessfulOnHome') || false;
    const showRegisterSuccessfulOnHome = sessionStorage.getItem('showRegisterSuccessfulOnHome') || false;
    const [ message, setMessage ] = MessageHook();

    if ( showLoginSuccessfulOnHome ) {
        // when login from widget on Home this message was not displayed here when set in Login component
        setMessage({type:"success", content:"You have logged in!"});
        sessionStorage.removeItem('showLoginSuccessfulOnHome');

    } else if ( showRegisterSuccessfulOnHome ) {

        setMessage({type:"success", content:"Account has been created!"});
        sessionStorage.removeItem('showRegisterSuccessfulOnHome');
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