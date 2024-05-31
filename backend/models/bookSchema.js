import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name:
    {
        type: String,
    },
    author: {
        type: String,
        required: [true, 'Please add the author name'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Please add the imageurl']
    },
}, {
    timestamps: true
});

const Book = mongoose.model("Book", bookSchema);
export default Book;  