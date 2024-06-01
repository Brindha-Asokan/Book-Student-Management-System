import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBook = () => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5001/book/book/${id}`)
      .then(res => {
        const book = res.data;
        setName(book.name);
        setAuthor(book.author);
        setImageUrl(book.imageUrl);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const handleImageURL = (e) => {
    setImageUrl(e.target.value);
  };

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
    axios.put(`http://localhost:5001/book/book/${id}`, { name, author, imageUrl })
      .then(res => {
        if (res.data.updated) {
          toast.success('Update done successfully!', {
            position: "top-center",
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
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    navigate('/books');
  }
  return (
    <div className="addbook">
      <div className="book-page">
        <div className="login-container">
          <h2>Edit Book</h2>
          <br />
          <div className="form-group">
            <label htmlFor="title">Book Title:</label>
            <input type="text" placeholder="Enter Title" value={name} onChange={handleName} />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author:</label>
            <input type="text" placeholder="Enter Author" value={author} onChange={handleAuthor} />
          </div>
          <div className="form-group">
            <label htmlFor="ImageURL">Image URL:</label>
            <input type="text" placeholder="Enter Image URL" value={imageUrl} onChange={handleImageURL} />
          </div>
          <button className="btn-login" onClick={handleSubmit}>Update</button>
          <button className="btn-cancel" onClick={handleCancel}>Cancel</button>  {/* Correct button label */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditBook;
