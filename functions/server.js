const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

 const getAll3 = async (req, res) => {
  try {
    const result1 = { "firstName": "jack" };
    const result2 = { "lastName": "Doe" };

    const jsonArray = [result1, result2];

    res.json(jsonArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

app.get('/', getAll3);

module.exports = app;
