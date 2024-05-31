import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard.jsx';
import '../css/Book.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Login.css';

const Books = ({ role }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5001/book/books")
      .then(res => {
        setBooks(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const bookElement = document.getElementById('book');

    if (bookElement) {
      if (books.length === 0 && !loading) {
        bookElement.classList.remove('book-list');
      } else {
        bookElement.classList.add('book-list');
      }
    }

    return () => {
      if (bookElement) {
        bookElement.classList.add('book-list');
      }
    };
  }, [books, loading]);

  if (loading) {
    return (
      <div className="loading">
        <p></p>
      </div>
    );
  }

  return (
    <div className='book-list' id='book'>
      {
        books.length > 0 ? (
          books.map(book => (
            <BookCard key={book._id} book={book} role={role} />
          ))
        ) : (
          <div className='logout'>
            <div className="logout-container">
              <p className="logout-text">No Book is available...</p>
            </div>
            <ToastContainer />
          </div>
        )
      }
    </div>
  );
};

export default Books;
