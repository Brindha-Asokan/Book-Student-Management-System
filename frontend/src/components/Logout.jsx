import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Login.css';

const Logout = ({ setUserRole }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const res = await axios.get("http://localhost:5001/auth/logout");
                if (res.data.logout) {
                    setTimeout(() => {
                        setUserRole('');
                        navigate('/');
                    }, 2000)
                }
            } catch (err) {
                console.error(err);
            }
        };
        logout();
    }, []);

    return (
        <div className='logout'>
            <div className="logout-container">
                <p class="logout-text">Logging you out...</p>
                <div class="spinner"></div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Logout;
