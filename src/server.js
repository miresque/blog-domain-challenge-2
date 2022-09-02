const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

app.disable('x-powered-by');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRouter = require('./routers/users');
app.use('/users', usersRouter);

const postsRouter = require('./routers/posts');
app.use('/posts', postsRouter);

const categoriesRouter = require('./routers/categories');
app.use('/categories', categoriesRouter);


module.exports = app