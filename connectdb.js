const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://allan-tv:V1kzxwByQ0TKEyg2@cluster0.uz4thkh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect('mongodb+srv://goal-setters:RP85g8sdLhsCig@cluster0.odrwphn.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to the database successfully');
});

module.exports = db;