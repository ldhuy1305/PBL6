import React, { useState, useEffect, useContext, } from 'react';
import User from './User/App';
import Store from './Store/Store';
import Admin from './Admin/App';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const UserRoute = ({ element, role }) => {
    const user = localStorage.getItem('user');

    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === role) {
        return element;
      } else {
        if (userData.role === 'User') {
          return (<User />)
        }
        else if (userData.role === 'Admin') {
          return (<Admin />)
        } else if (userData.role === 'Owner') {
          return (<Store />)
        }
      }
    } else {
      return (<User />);
    }
  };

  return (

    <AuthContextProvider>
      <ChatContextProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<UserRoute element={<User />} role="User" />} />
            <Route path="/store/*" element={<UserRoute element={<Store />} role="Owner" />} />
            <Route path="/admin/*" element={<UserRoute element={<Admin />} role="Admin" />} />
          </Routes>
        </Router>
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

export default App;
