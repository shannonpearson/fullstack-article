const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/schema');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SERVES STATIC HOMEPAGE
app.get('/', (req, res) => { // req, res, next (took out next because not used for linter)
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/all', (req, res) => {
  db.getAllArticlesByDate((err, results) => {
    if (err) {
      console.log('error', err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/search', (req, res) => {
  console.log('search filter', req.query);
  db.searchArticlesByTag(req.query.filter);
  res.status(200).json({});
});

app.post('/new', (req, res) => {
  db.newArticle(req.body.article, (err, results) => {
    if (err) {
      console.log('error', err);
    } else {
      res.status(200).json(results);
    }
  });
});

// probably update urls to /article/edit, etc
app.patch('/edit', (req, res) => {
  console.log('patching', req.body);
  db.updateArticle(req.body.id, req.body.data, (err, results) => {
    if (err) {
      console.log('error', err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.delete('/delete', (req, res) => {
  db.deleteArticle(req.query.id, (err, results) => {
    if (err) {
      console.log('error deleting in server', err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(8000, () => {
  console.log('Server running osn port 8000.\nKeep "yarn wds" running in an other terminal.');
});
