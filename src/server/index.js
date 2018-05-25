const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const getAllArticlesByDate = require('../database/schema');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SERVES STATIC HOMEPAGE
app.get('/', (req, res) => { // req, res, next (took out next because not used for linter)
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/all', (req, res) => {
  getAllArticlesByDate((err, results) => {
    console.log('error', err);
    console.log('results', results);
    res.send('success');
  });
});

app.listen(8000, () => {
  console.log('Server running on port 8000.\nKeep "yarn wds" running in an other terminal.');
});
