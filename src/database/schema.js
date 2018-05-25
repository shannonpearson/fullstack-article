const mongoose = require('mongoose');

const uri = 'mongodb://shannon:verb@ds123129.mlab.com:23129/articles';
// const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/articles';

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', () => { console.log('connected'); });
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

  const getAllArticlesByDate = function (cb) {
    Article.find({}).sort('dateCreated').exec((err, results) => {
      console.log('error', err, 'results', results);
      cb(err, results);
    });
  };


// instance: const article = new Article({ title: 'some string', author: 'some name string', etc. })
// could add method to find same author, probably same tags?
// maybe do a separate method for both of those tho


module.exports = getAllArticlesByDate;
