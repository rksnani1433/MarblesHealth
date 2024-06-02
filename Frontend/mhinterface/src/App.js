import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Userform from './Components/Userform';
import UserList from './Components/Userlist';
import UserDetails from './Components/Userdetail';
import UserUpdate from './Components/Userupdate';

import './App.css';

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li className='nav-list'>
            <Link to="/users">UserList</Link>
          </li>
          <li className='nav-list'>
            <Link to="/users/create">UserAddForm</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/users/create" />} />
        <Route path="/users/create" element={<Userform />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/user/update/:id" element={<UserUpdate />} />

      </Routes>
    </div>
  </Router>
);

export default App;
