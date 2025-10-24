require('dotenv').config();
const mongoose = require('mongoose');

console.log('MONGODB_URI present:', !!process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('Connected to MongoDB (test)'); process.exit(0); })
  .catch(err => { console.error('Connection error (test):', err.message); process.exit(1); });