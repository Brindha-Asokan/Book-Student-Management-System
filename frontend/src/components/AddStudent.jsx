import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AddStudent = () => {
  const [rollNo, setRollNo] = useState('');
  const [userName, setUserName] = useState('');
  const [grade, setGrade] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (value.length === 1 && value === ' ') {
      e.target.value = '';
    } else {
      setter(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rollNo || !userName || !grade || !password) {
      toast.error('All fields are required!', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    axios.post('http://localhost:5001/student/register', { rollNo, userName, grade, password })
      .then(res => {
        if (res.data.registered) {
          toast.success('Student registered successfully!', {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        }
      })
      .catch(err => {
        console.log('Error:', err);

        if (err.response) {
          console.log('Error response:', err.response);
          toast.error(err.response.data.message, {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error('Error: ' + err.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };
  const handleCancel = () => {
    navigate('/dashboard');
  }
  return (
    <div className="full">
      <div className="login-page">
        <div className="login-container">
          <h2>Register Student</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="rollNo">Roll No:</label>
              <input type="text" id="rollNo" placeholder="Enter Roll No." onChange={handleInputChange(setRollNo)} />
            </div>
            <div className="form-group">
              <label htmlFor="userName">UserName:</label>
              <input type="text" id="userName" placeholder="Enter UserName" onChange={handleInputChange(setUserName)} />
            </div>
            <div className="form-group">
              <label htmlFor="grade">Grade:</label>
              <input type="text" id="grade" placeholder="Enter Grade" onChange={handleInputChange(setGrade)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <div className='password-input-container'>
                <input type={showPassword ? 'text' : 'password'} id="password" className="password-input-field" onChange={handleInputChange(setPassword)}
                  placeholder="Enter Password" />
                <span onClick={togglePasswordVisibility} className="password-toggle-icon">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
            </div>
            <div className='btn-div'>
              <button className="btn-login" type="submit">Register</button>
              <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddStudent;
