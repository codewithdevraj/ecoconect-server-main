const mongoose = require('mongoose');

async function connectMongoDB(dburl) {
  return mongoose.connect(dburl)
}

module.exports = {
  connectMongoDB,
};