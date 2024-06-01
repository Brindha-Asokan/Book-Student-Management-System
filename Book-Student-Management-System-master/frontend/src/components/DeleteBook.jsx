import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const DeleteBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.delete(`http://localhost:5001/book/book/${id}`)
            .then(res => {
                if (res.data.deleted) {
                    navigate('/books');
                }
            })
            .catch(err => console.log(err));
    }, [id]);
}

export default DeleteBook;