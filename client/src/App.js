import './App.css';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useReducer } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import SingleArticle from "./pages/SingleArticle";
import SingleCategory from "./pages/SingleCategory";
import PageNotFound from "./pages/PageNotFound";

import AppNavBar from "./components/AppNavBar";

import { AuthReducer } from "./reducers/AuthReducer";

function App() {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') || false;
  const [ auth, dispatchAuth ] = useReducer(AuthReducer, { } );
  let user = auth;

  // empty user data? get name from store for display purpose
  if ( isAuthenticated && !user.firstname ) {
    user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
  }

  return (
    <Router>
      <Container maxWidth="xl">
        <AppNavBar user={user} />

        <Routes>
          <Route path="/" index element={<Home dispatchAuth={dispatchAuth} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/article/:slug" element={<SingleArticle />} />
          
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:name" element={<SingleCategory />} />

          <Route path="/register" element={<Register dispatchAuth={dispatchAuth} />} />
          <Route path="/login" element={<Login dispatchAuth={dispatchAuth} />} />
          <Route path="/logout" element={<Logout />} />

          { /* .. when all route matches fail */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
