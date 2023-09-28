const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const charactersRouter = require('./charactersRouter');
const reviewsRouter = require('./reviewsRouter');

app.use('/data/characters', charactersRouter);
app.use('/data', reviewsRouter);


module.exports = app


