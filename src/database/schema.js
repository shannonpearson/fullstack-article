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
    if (err) {
      console.log('error getting all articles', err);
    } else {
      cb(err, results);
    }
  });
};

const searchArticles = (filters, cb) => {
  // filters is an object with db parameters to search (e..g title)
  Article.find(filters).sort('dateCreated').exec((err, results) => {
    if (err) {
      console.log('error searching results in db', err);
    } else {
      console.log('searched articles', results);
      cb(results);
    }
  });
};

const newArticle = (article, cb) => {
  Article.create(article, (err) => {
    if (err) {
      console.log('error adding new article', err);
    } else {
      console.log('added new article!');
      getAllArticlesByDate(cb);
    }
  }); // article should have all fields (title, author, body, tags)
  // need to search articles again
};

const updateArticle = (articleId, changes, cb) => {
  // article should have all fields to UPDATE, plus _id as id
  Article.updateOne({ _id: articleId }, changes, (err, res) => {
    if (err) {
      console.log('error updating article', err);
    } else {
      console.log(`updated ${res} articles`);
      getAllArticlesByDate(cb);
    }
  });
};

const deleteArticle = (articleId) => {
  Article.deleteOne({ _id: articleId }, (err) => {
    if (err) {
      console.log('error deleting article', err);
    } else {
      console.log('article deleted!');
    }
  });
};

// instance: const article = new Article({ title: 'some string', author: 'some name string', etc. })
// could add method to find same author, probably same tags?
// maybe do a separate method for both of those tho


module.exports = {
  getAllArticlesByDate,
  searchArticles,
  newArticle,
  updateArticle,
  deleteArticle,
};
