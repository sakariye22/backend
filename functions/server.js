const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const Array2 = [
  {
    "id": 1,
    "name": "John Doe",
    "age": 28
  },
  {
    "id": 2,
    "name": "Jane Doe",
    "age": 22
  }
];

const getAll = async (req, res) => {
  return { newMessage: "hej igen" };
};

const getAll2 = async (req, res) => {
  return { newMessage2: "hallå" };
};

/*const getAll3 = async (req, res) => {
  try {
    const result1 = await getAll(req, res);
    const result2 = await getAll2(req, res);


    const combinedResult = {
      ...result1,
      ...result2
    };

    res.json(combinedResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
*/  const getAll3 = async (req, res) => {
  try {
    const result1 = { "firstName": "John" };
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
