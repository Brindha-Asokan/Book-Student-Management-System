import Book from "../models/bookSchema.js";
import asyncHandler from 'express-async-handler';

export const bookController = asyncHandler(async (req, res) => {
   try {
      const { name, author, imageUrl } = req.body;
      const newBook = await Book.create({
         name,
         author,
         imageUrl
      });

      return res.json({ added: true, book: newBook, registered: true }); 
   } catch (err) {
      return res.json({ message: "Error in adding book" });
   }
});

export const getBooks = asyncHandler(async (req, res) => {
   try {
      const books = await Book.find();
      return res.json(books); 
   } catch (err) {
      return res.json(err);
   }
});

export const editBook = asyncHandler(async (req, res) => {
   try {
      const id = req.params.id;
      const book = await Book.findById(id);
      return res.json(book); 
   } catch (err) {
      return res.json(err);
   }
});

export const updateBook = asyncHandler(async (req, res) => {
   try {
      const id = req.params.id;
      const book = await Book.findByIdAndUpdate(id, req.body);
      return res.json({updated:true, book}); 
   } catch (err) {
      return res.json(err);
   }
});

export const deleteBook = asyncHandler(async (req, res) => {
   try {
      const id = req.params.id;
      const book = await Book.findByIdAndDelete(id, req.body);
      return res.json({deleted:true, book}); 
   } catch (err) {
      return res.json(err);
   }
});