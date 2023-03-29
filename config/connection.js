const { connect, connection } = require('mongoose');

connect('mongodb://localhost/SocialMediaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;