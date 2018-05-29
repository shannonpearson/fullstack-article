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

app.post('/articles/new', (req, res) => {
  db.newArticle(req.body.article, (err, results) => {
    if (err) {
      res.sendStatus(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.put('/articles/edit', (req, res) => {
  db.updateArticle(req.body.id, req.body.changes, (err, results) => {
    if (err) {
      res.sendStatus(err);
    } else {
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
  db.searchArticlesByTag(req.query.tag, (err, results) => {
    if (err) {
      res.sendStatus(err);
    } else {
      res.status(200).json(results);
    }
  });
});


app.listen(process.env.PORT || 8000, () => {
  console.log('Server running on port 8000.\nKeep "yarn wds" running in an other terminal.');
});
