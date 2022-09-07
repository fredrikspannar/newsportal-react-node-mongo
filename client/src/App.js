import './App.css';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AppNavBar from "./components/AppNavBar";

function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <AppNavBar />

        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/login" index element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
