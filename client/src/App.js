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

  const handleLogIn = (userData) => {
    delete userData.__v;
    dispatchAuth( { type: AUTH_LOGIN, payload: userData } );

    setMessage({type:"success", message:"You have logged in!"});
    sessionStorage.setItem('isAuthenticated',true);
  }

  return (
    <Router>
      <Container maxWidth="xl">
        <AppNavBar user={auth} isAuthenticated={isAuthenticated} />

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
