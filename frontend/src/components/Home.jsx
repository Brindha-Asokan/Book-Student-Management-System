import React, { useEffect } from 'react';
import '../css/Home.css';

const Home = ({ setUserRole }) => {
  return (
    <div className='main'>
      <div className="main-image"></div>
      <div className="container">
        <p className="animated-text">Welcome to Your Literary Haven!</p>
      </div>
    </div>
  )
}

export default Home;
