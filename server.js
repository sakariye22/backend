const express = require ('express');
const router = require('./routes/simple.js')
const app = express();
app.use(express.json());
require('dotenv').config();



app.use('/', router);


 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

