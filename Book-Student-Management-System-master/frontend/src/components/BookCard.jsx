import React from 'react';
import '../css/Book.css';
import { Link } from 'react-router-dom';

const BookCard = ({ book, role }) => {
    const { name, author, imageUrl } = book;
    return (
        <div className='book-card'>
            <div className='book-img'><img src={imageUrl} alt={name} className='book-image' /></div>
            <div className="book-details">
                <h3>{name}</h3>
                <p>{author}</p>
            </div>
            {role === 'admin' &&
                <div className='book-actions'>
                    <Link to={`/book/${book._id}`}><button className="button1">Edit</button></Link>
                    <Link to={`/delete/${book._id}`}><button className="button2">Delete</button></Link>
                </div>}
        </div>
    )
}

export default BookCard;