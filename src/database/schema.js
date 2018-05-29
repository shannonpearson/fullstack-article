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
  title: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  body: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  lastUpdate: { type: Date, default: Date.now },
  tags: Array,
});

// add methods BEFORE compiling with model

const Article = mongoose.model('Article', articleSchema);

const getAllArticlesByDate = function (cb) {
  Article.find({}).sort('dateCreated').exec((err, results) => {
    if (err) {
      console.log('error getting all articles', err);
      cb(500, null);
    } else {
      cb(null, results);
    }
  });
};

const newArticle = (article, cb) => {
  Article.create(article, (err) => {
    if (err) { // this should only happen if the article isn't valid to go into the database;
    // handle cases for both invalid article and valid article but otherwise can't add to db
    // but also form validation could handle it so there should only ever be a valid article sent
      cb(400, null);
    } else {
      getAllArticlesByDate(cb);
    }
  });
};

const updateArticle = (articleId, changes, cb) => {
  Article.updateOne({ _id: articleId }, changes, (err, res) => {
    if (err) {
      console.log('error updating article', err);
      cb(400, null);
    } else {
      console.log(`updated ${res.nModified} articles; changes: `, changes);
      getAllArticlesByDate(cb);
    }
  });
};

const searchArticlesByTag = (tag, cb) => {
  const query = tag ? { tags: tag } : {};
  Article.find(query).sort('dateCreated').exec((err, results) => {
    if (err) {
      console.log('error searching results in db');
    } else {
      cb(results);
    }
  });
};

const deleteArticle = (articleId, cb) => {
  Article.deleteOne({ _id: articleId }, (err) => {
    if (err) {
      cb(400, null);
    } else {
      getAllArticlesByDate(cb);
    }
  });
};

module.exports = {
  getAllArticlesByDate,
  searchArticlesByTag,
  newArticle,
  updateArticle,
  deleteArticle,
};
