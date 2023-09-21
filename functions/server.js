const express = require('express');
const app = express();
const cors = require('cors');
const dataRouter = require('./routes/Router'); 

app.use(express.json());
app.use(cors());

app.use('/data', dataRouter); 





module.exports = app;
