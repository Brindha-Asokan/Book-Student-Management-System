import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBook = () => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (value.length === 1 && value === ' ') {
      e.target.value = '';
    } else {
      setter(value);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !author || !imageUrl) {
      toast.error('All fields are required!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    axios.post("http://localhost:5001/book/add", { name, author, imageUrl })
      .then(res => {
        if (res.data.added) {
          toast.success('Book added successfully!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate('/books');
          }, 1000);
        }
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
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
    navigate('/books');
  }
  return (
    <div className="addbook">
      <div className="book-page">
        <div className="login-container">
          <h2>Add Book</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Book Title:</label>
              <input type="text" placeholder="Enter Title" onChange={handleInputChange(setName)} />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <input type="text" placeholder="Enter Author" onChange={handleInputChange(setAuthor)} />
            </div>
            <div className="form-group">
              <label htmlFor="ImageURL">Image URL:</label>
              <input type="text" placeholder="Enter Image URL" onChange={handleInputChange(setImageUrl)} />
            </div>
            <div className='btn-div'>
              <button className="btn-login" onClick={handleSubmit}>Create Book</button>
              <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddBook;
