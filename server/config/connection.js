const mongoose = require('mongoose');

<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-shopping');
=======
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/final-dead-end');
>>>>>>> cbbd5c97e4ce492c244f4f70fd933936363bd5da

module.exports = mongoose.connection;
