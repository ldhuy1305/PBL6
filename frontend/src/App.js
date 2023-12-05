import React, {useState, useEffect } from 'react';
import User from './User/App';
import Store from './Store/Store';
import Admin from './Admin/App';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const UserRoute = ({ element, role }) => {
    // const [userRole, setUserRole] = useState('');
    const user = localStorage.getItem('user');

      // if (user) {
      // const userData = JSON.parse(user);
    // if (userRole !== role) {
    //   if(userRole === 'User') {
    //     return <Navigate to="/"/>;
    //   }
    //   else if (userRole === 'Admin') {
    //     return <Navigate to="/admin/"/>;
    //   } else if (userRole === 'Owner') {
    //     return <Navigate to="/store/"/>;
    //   } else if (userRole ==='') {
    //     return <Navigate to="/"/>;
    //   }
    // }

    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === role) {
        return element;
      } else {
        if(userData.role === 'User') {
              // return <Navigate to="/"/>;
              return (<User/>)
            }
            else if (userData.role === 'Admin') {
              // return <Navigate to="/admin/"/>;
              return (<Admin/>)
            } else if (userData.role === 'Owner') {
              // return <Navigate to="/store/"/>;
              return (<Store/>)
            } 
            // else if (userRole ==='') {
              // return <Navigate to="/"/>;
            // }
      }
    } else {
      return (<User />);
    }
    // return element;
    // return <Navigate to="/"/>
  };

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoute element={<User />} role="User" />} />
        <Route path="/store/*" element={<UserRoute element={<Store />} role="Owner" />} />
        <Route path="/admin/*" element={<UserRoute element={<Admin />} role="Admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
