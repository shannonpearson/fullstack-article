const mongoose = require('mongoose');

mongoose.connect('mongodg://localhost/articles');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});
