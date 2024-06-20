import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Home } from './pages/HomePage';
import {Login} from './pages/LoginPage';
import Detail from './pages/DetailPage';
import { Summary } from './pages/SummaryPage';
import { Navbar } from './components/navbar';

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    const token = localStorage.getItem('authToken');
    return token !== null;
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setLoggedIn(token !== null);
  }, []);

  return (
    <>
      <Navbar />
      <Container className='mb-4'>
        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={loggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setLoggedIn} />} />
          <Route path="/home" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/detail" element={loggedIn ? <Detail /> : <Navigate to="/login" />} />
          <Route path="/summary" element={loggedIn ? <Summary /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={loggedIn ? "/home" : "/login"} />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
