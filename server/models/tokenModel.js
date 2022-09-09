import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tokenSchema = new mongoose.Schema({
    token: String,
    userId: ObjectId,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true // this property should not be able to change later
    }    
});

const Token = mongoose.model('Token', tokenSchema);
export default Token;
    