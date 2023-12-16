import React, {useState, useEffect } from 'react';
import User from './User/App';
import Store from './Store/Store';
import Admin from './Admin/App';
import Shipper from './Shipper/shipper'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const UserRoute = ({ element, role }) => {
    // const [userRole, setUserRole] = useState('');
    const user = localStorage.getItem('user');

    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === role) {
        return element;
      } else {
        if(userData.role === 'User') {
              return (<User/>)
            }
            else if (userData.role === 'Admin') {
              return (<Admin/>)
            } else if (userData.role === 'Owner') {
              return (<Store/>)
            } else if (userData.role === 'Shipper') {
              return (<Shipper/>)
            } 
      }
    } else {
      return (<User />);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/shipper" element={<UserRoute element={<Shipper />} role="Shipper" />} />
        <Route path="/*" element={<UserRoute element={<User />} role="User" />} />
        <Route path="/store/*" element={<UserRoute element={<Store />} role="Owner" />} />
        <Route path="/admin/*" element={<UserRoute element={<Admin />} role="Admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
