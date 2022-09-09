import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    sourceName: String,
    author: String,
    title: String,
    description: String,
    content: String,
    url: String,
    slug: String,
    urlToImage: String,
    publishedAt: Date,
    cachedAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true // this property should not be able to change later
    }
});


const Article = mongoose.model('Article', articleSchema);
export default Article;    