import './App.css';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useReducer, useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

import AppNavBar from "./components/AppNavBar";

import { AuthReducer, AUTH_LOGIN } from "./reducers/AuthReducer";


function App() {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') || false;
  const [ auth, dispatchAuth ] = useReducer(AuthReducer, { } );
  const [ message, setMessage ] = useState(false);
  let user = auth;

  const handleLogIn = (userData) => {
    delete userData.__v;
    delete userData._id;
    delete userData.createdAt;
    delete userData.email;

    dispatchAuth( { type: AUTH_LOGIN, payload: userData } );

    // feedback after login
    setMessage({type:"success", message:"You have logged in!"});
    sessionStorage.setItem('isAuthenticated',true);

    // store user name for display purpose
    userData = JSON.stringify(userData); // needs to be encoded before sessionStorage
    sessionStorage.setItem('userData',userData);
  }

  // empty user data? get name from store for display purpose
  if ( isAuthenticated && !user.firstname ) {
    user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
  }

  return (
    <Router>
      <Container maxWidth="xl">
        <AppNavBar user={user} isAuthenticated={isAuthenticated} />

        <Routes>
          <Route path="/" index element={isAuthenticated === false ? <Navigate replace to="/login" /> : <Home message={message} />} />
          <Route path="/login" element={<Login handleLogIn={handleLogIn} />} />

          { /* .. when all route matches fail */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
