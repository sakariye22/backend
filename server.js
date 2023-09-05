const express = require ('express');
const mongoose = require ('mongoose');
const app = express();
app.use(express.json());


app.get('/home', (req, res) => {
    res.json('home');
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

