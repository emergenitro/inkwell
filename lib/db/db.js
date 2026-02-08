
const mongoose = require('mongoose');
const uri = process.env.MONGOOSE_URL;

console.log('MongoDB URI:', uri);

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = mongoose.connection;