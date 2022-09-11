import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true // this property should not be able to change later
    }    
});

const Category = mongoose.model('Category', categorySchema);
export default Category;