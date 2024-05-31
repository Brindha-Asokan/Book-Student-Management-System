import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Books from './components/Books.jsx';
import Login from './components/Login.jsx';
import Dashboard from "./components/Dashboard.jsx";
import AddStudent from "./components/AddStudent.jsx";
import Logout from "./components/Logout.jsx";
import AddBook from "./components/AddBook.jsx";
import EditBook from "./components/EditBook.jsx";
import DeleteBook from "./components/DeleteBook.jsx";
import { useState, useEffect } from "react";
import axios from 'axios';
import './App.css'

function App() {
  const [role, setUserRole] = useState('');
  axios.defaults.withCredentials = true;  

  useEffect(() => {
    axios.get('http://localhost:5001/auth/verify')
      .then(res => {
        if (res.data.login) {
          setUserRole(res.data.role);
          console.log(res.data.role)
        } else {
          setUserRole('');
        }
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Home setUserRole={setUserRole} />} />
        <Route path="/books" element={<Books role={role}/>} />
        <Route path='/login' element={<Login setUserRole={setUserRole} />} />
        <Route path='/dashboard' element={<Dashboard setUserRole={setUserRole}/>} />
        <Route path='/addstudent' element={<AddStudent />} />
        <Route path='/addbook' element={<AddBook />} />
        <Route path='/logout' element={<Logout setUserRole={setUserRole} />} />
        <Route path='/book/:id' element={<EditBook setUserRole={setUserRole} />} />
        <Route path='/delete/:id' element={<DeleteBook setUserRole={setUserRole} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
