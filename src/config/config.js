// import .env variables
require('dotenv').config();

module.exports = {
  baseUrl: process.env.BASE_URL,
  port:process.env.PORT,
  mongoUri: process.env.MONGO_URI
};
