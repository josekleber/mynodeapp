require('./environment/env');
const express = require('express');
const router = require('./routes');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();


app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(router);

module.exports = app;
