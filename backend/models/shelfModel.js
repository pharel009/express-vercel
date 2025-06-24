import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shelfSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { timestamps: true });

const Shelf = mongoose.model('Shelf', shelfSchema);

export default Shelf;