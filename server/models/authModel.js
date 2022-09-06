import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },   
    password: {
        type: String,
        required: true,
    },     
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true // this property should not be able to change later
    },
    updatedAt: Date
});


const Auth = mongoose.model('Auth', authSchema);
export default Auth;