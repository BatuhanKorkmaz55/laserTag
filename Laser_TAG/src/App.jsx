import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import About from './components/About';
import Booking from './components/Booking';
import PlaystationStatus from './components/PlaystationStatus.jsx';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/status" element={<PlaystationStatus />} />
          <Route path="/admin" element={isAdmin ? <AdminPanel /> : <AdminLogin onLogin={setIsAdmin} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
