const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { port } = require('./config/config.js');
const frontRoutes = require('../src/api/routes/front/index')

const mongoose = require('./config/mongoose');
mongoose.connect()

app.use(bodyParser.json())

app.use('/front',frontRoutes)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});