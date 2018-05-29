const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/schema');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// if (process.env.NODE_ENV === 'production') {
//   app.use('/static', express.static((path.join(__dirname, 'dist')));
// }

// SERVES STATIC HOMEPAGE
app.get('/', (req, res) => { // req, res, next (took out next because not used for linter)
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/articles/all', (req, res) => {
  db.getAllArticlesByDate((err, results) => {
    if (err) {
      console.log('error', err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/articles/new', (req, res) => {
  db.newArticle(req.body.article, (err, results) => {
    if (err) {
      res.sendStatus(err);
    } else {
      res.status(200).json(results);
    }
  });
});

// probably update urls to /article/edit, etc
app.put('/articles/edit', (req, res) => {
  console.log('putting', req.body);
  db.updateArticle(req.body.id, req.body.changes, (err, results) => {
    if (err) {
      console.log('error', err);
      res.sendStatus(err);
    } else {
      console.log('updated article, results now', results)
      res.status(200).json(results);
    }
  });
});

app.delete('/articles/delete', (req, res) => {
  db.deleteArticle(req.query.id, (err, results) => {
    if (err) {
      res.sendStatus(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/articles/search', (req, res) => {
  db.searchArticlesByTag(req.query.tag, (results) => {
    res.status(200).json(results);
  });
});

// app.use(express.static(path.join(__dirname)));

app.listen(process.env.PORT || 8000, () => {
  console.log('Server running osn port 8000.\nKeep "yarn wds" running in an other terminal.');
});
