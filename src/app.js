const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(compression());
app.use(helmet());

app.use('/', indexRouter);

module.exports = app;
