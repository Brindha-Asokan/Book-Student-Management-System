import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = ({ role }) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <>
      <button className="navbar-toggle" onClick={toggleNavbar}>
        ☰
      </button>
      <nav className={`navbar ${isNavbarVisible ? 'visible' : ''}`}>
        <div className='navbar-left'>
          <Link to="/" className='navbar-brand'>Home</Link>
        </div>
        <div className='navbar-right'>
          <Link to="/books" className='navbar-link'>Books</Link>
          {role === 'admin' &&
            <>
              <Link to="/addbook" className='navbar-link'>Add Book</Link>
              <Link to="/addstudent" className='navbar-link'>Add Student</Link>
              <Link to="/dashboard" className='navbar-link'>Dashboard</Link>
            </>
          }

          {role === '' ? <Link to="/login" className='navbar-link'>Login</Link>
            : <Link to="/logout" className='navbar-link'>Logout</Link>
          }
        </div>
      </nav>
    </>
  );
}

export default Navbar;
