import React from 'react'
import User from './User/App'
import Store from './Store/Store'
import Admin from './Admin/App'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<User />} />
        <Route path="/store/*" element={<Store />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
