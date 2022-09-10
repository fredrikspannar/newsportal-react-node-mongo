import ArticleList from "../components/ArticleList";
import { Navigate, useLocation } from "react-router-dom";
import MessageHook from "../utils/messageHook.js";

const Home = () => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') || false;
    const [ message ] = MessageHook();
    let location = useLocation();

    if ( isAuthenticated === false || isAuthenticated === "false" ) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <>
            <h1>Home</h1>
            <ArticleList />

            {message !== false && message}
        </>
    );

}

export default Home;