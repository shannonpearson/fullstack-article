const mongoose = require('mongoose');

const uri = 'mongodb://shannon:verb@ds.mongolab.com:23129/articles';
// const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/articles';

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {

});

const articleSchema = mongoose.Schema({
  title: String,
  author: String,
  body: String,
  dateCreated: { type: Date, default: Date.now },
  lastUpdate: { type: Date, default: Date.now },
  tags: Array,
});

// add methods here, before compiling with model

const Article = mongoose.model('Article', articleSchema);

// instance: const article = new Article({ title: 'some string', author: 'some name string', etc. })
// could add method to find same author, probably same tags?
// maybe do a separate method for both of those tho

export default Article;
