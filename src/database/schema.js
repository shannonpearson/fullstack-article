/* eslint-disable no-plusplus */
/* eslint-disable no-prototype-builtins */
const mongoose = require('mongoose');
const uniq = require('lodash/uniq');

const uri = 'mongodb://shannon:verb@ds123129.mlab.com:23129/articles';
// const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/articles';

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', () => { console.log('connected'); });
db.once('open', () => {
});

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  body: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  lastUpdate: { type: Date, default: Date.now },
  tags: Array,
});

// add methods BEFORE compiling with model

const Article = mongoose.model('Article', articleSchema);

// search by tag if provided, otherwise return all articles; sort by most recent
const searchArticlesByTag = (tag, cb) => {
  const query = tag ? { tags: tag } : {};
  Article.find(query).sort({ dateCreated: -1 }).exec((err, results) => {
    if (err) { // if query fails, return server error
      cb(503, null);
    } else { // otherwise, get all tags from all articles
      Article.find({}, { tags: 1, _id: 0 }, (error, res) => {
        if (error) { // if tags query fails, still return results but with empty array of tags
          cb(null, { results, tags: [] });
        } else { // otherwise return articles and array of all tags
          const tags = uniq(res.reduce((array, obj) => array.concat(obj.tags), []));
          cb(null, { results, tags });
        }
      });
    }
  });
};

// add new article record and return updated collection of all articles
const newArticle = (article, cb) => {
  Article.create(article, (err) => {
    if (err) {
      /* form validation confirms client sends valid article,
      so this should only happen if there's a server error */
      cb(500, null);
    } else {
      searchArticlesByTag(null, cb);
    }
  });
};

// update existing article record and return updated collection of all articles
const updateArticle = (articleId, changes, cb) => {
  Article.find({ _id: articleId }, (err) => {
    if (err) { // handles case where article with id doesn't exist
      newArticle(changes, cb);
    } else {
      Article.updateOne({ _id: articleId }, changes, (error) => {
        if (error) { // form validation and server should confirm valid changes were sent
          cb(500, null);
        } else {
          searchArticlesByTag(null, cb);
        }
      });
    }
  });
};

// delete article record and return updated collection of all articles
const deleteArticle = (articleId, cb) => {
  Article.deleteOne({ _id: articleId }, (err) => {
    if (err) { // server should confirm ID is sent
      cb(500, null);
    } else {
      searchArticlesByTag(null, cb);
    }
  });
};

module.exports = {
  searchArticlesByTag,
  newArticle,
  updateArticle,
  deleteArticle,
};
