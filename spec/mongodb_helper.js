const mongoose = require('mongoose');

const mongoDbUrl = process.env.MONGODB_URL || 'mongodb://localhost/acebook';

beforeAll(function(done) {
  mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', function() {
    done();
  });
});

afterAll(function() {
  return mongoose.connection.close();
});
