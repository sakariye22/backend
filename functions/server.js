const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());


const data = [
  {
    "id": 0,
    "firstName": "Daenerys",
    "lastName": "Targaryen",
    "fullName": "Daenerys Targaryen",
    "title": "Mother of Dragons",
    "family": "House Targaryen",
    "image": "daenerys.jpg",
    "imageUrl": "https://thronesapi.com/assets/images/daenerys.jpg"
  },
  {
    "id": 1,
    "firstName": "Samwell",
    "lastName": "Tarly",
    "fullName": "Samwell Tarly",
    "title": "Maester",
    "family": "House Tarly",
    "image": "sam.jpg",
    "imageUrl": "https://thronesapi.com/assets/images/sam.jpg"
  }
];


app.get('/data', (req, res) => {
  res.json(data);
});

app.get('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const entry = data.find(item => item.id === id);

  if (!entry) {
    return res.status(404).json({ error: 'Entry not found' });
  }

  res.json(entry);
});




module.exports = app;
