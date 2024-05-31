import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Dashboard.css'

const Dashboard = () => {
  const [student, setStudent] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [book, setBook] = useState(0);
  useEffect(() => {
    axios.get('http://localhost:5001/dashboard')
      .then(res => {
        if (res.data.ok) {
          setStudent(res.data.student)
          setAdmin(res.data.admin)
          setBook(res.data.book)
          console.log(res.data.student, res.data.admin, res.data.book)
        }
      }
      ).catch(err => { console.log(err) })
  }, [])
  return (
    <div className="dashboard">
      <div className="dashboard-box">
        <h2 className="animated-text">COUNT OF EACH MODULE</h2>
        <div className="text">
          <h2 className='animated-text'>Total Books</h2>
          <h2>{book}</h2>
        </div>
        <div className="text">
          <h2 className='animated-text'>Total Students</h2>
          <h2>{student}</h2>
        </div>
        <div className="text">
          <h2 className='animated-text'>Total Admins</h2>
          <h2>{admin}</h2>
        </div>
      </div>
    </div>
  )
}

export default Dashboard