import React, {useState, useEffect} from 'react';
import User from './User/App';
import Store from './Store/Store';
import Admin from './Admin/App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notify from './User/Components/Notify.jsx/Notify';
import { withRouter } from 'react-router-dom';
import { faL } from '@fortawesome/free-solid-svg-icons';
function App() {
  const [openNotify, setOpenNotify] = useState(false)
  const UserRoute = ({ element, role }) => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === role) {
        return element;
      } else {
        setOpenNotify(true)
      }
    } else {
      return (<User />);
    }
  };

  useEffect (() => {
    console.log(openNotify)
  }, [openNotify])

  return (
    <Router>
    {openNotify && (<Notify message='Bạn không có quyền truy cập trang này!' setOpenNotify={setOpenNotify}/>)}
      <Routes>
        <Route path="/*" element={<UserRoute element={<User />} role="User" />} />
        <Route path="/store/*" element={<UserRoute element={<Store />} role="Owner" />} />
        <Route path="/admin/*" element={<UserRoute element={<Admin />} role="Admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
