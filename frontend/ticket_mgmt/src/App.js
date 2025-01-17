import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import TicketDetail from './components/TicketDetail';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import AdminLogin from './components/AdminLogin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/user_register" element={<UserRegister />} />
        <Route path="/user_login" element={<UserLogin />} />
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/user_dashboard" element={<UserDashboard />} />
        <Route path="/tickets/:id" element={<TicketDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
