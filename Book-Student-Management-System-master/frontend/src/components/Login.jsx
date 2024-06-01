import React, { useState } from "react";
import axios from 'axios';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ setUserRole }) => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    axios.defaults.withCredentials = true;
    const handleSubmit = () => {
        axios.post('http://localhost:5001/auth/login', { userName, password, role })
            .then(res => {
                if (res.data.login) {
                    setUserRole(res.data.role);
                    toast.success('Login successful!', {
                        position: "bottom-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => {
                        navigate(res.data.role === 'admin' ? '/dashboard' : '/');
                    }, 1000);
                }
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error('Error: ' + err.message, {
                        position: "top-center",
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
        navigate('/');
    }
    return (
        <div className="login">
            <div className="log-page">
                <div className="login-container">
                    <h2>Login</h2>
                    <br />
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" placeholder="Enter Username" onChange={handleUsernameChange} />
                    </div>
                    <div className="form-group">
                        <div className='password-input-container'>
                            <input type={showPassword ? 'text' : 'password'} id="password" className="password-input-field" onChange={handlePasswordChange}
                                placeholder="Enter Password" />
                            <span onClick={togglePasswordVisibility} className="password-toggle-icon">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <select name="role" id="role" onChange={handleRoleChange}>
                            <option value="" placeholder='Choose Role'></option>
                            <option value="admin">Admin</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                    <div className='btn-div'>
                        <button className="btn-login" onClick={handleSubmit}>Login</button>
                        <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
