import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        default: ''
    },
    shelf: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shelf'
        }
    ]
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

export default Book;