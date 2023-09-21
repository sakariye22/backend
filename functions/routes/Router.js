const express = require('express');
const router = express.Router()


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



function validateRequiredFields(req, res, next) {
  const requiredFields = ['id', 'firstName', 'lastName', 'image', 'imageUrl'];

  for (const field of requiredFields) {
    if (!(field in req.body)) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }

  next(); 
}

app.post('/data', validateRequiredFields, (req, res) => {
  try {
    const newData = req.body; 

    data.push(newData);


    res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.patch('/data/:id', validateRequiredFields, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    const updatedData = req.body;
    data[index] = { ...data[index], ...updatedData };

    res.json(data[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/data', (req, res) => {
  try {
    data.length = 0; 
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/data/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    const deletedEntry = data.splice(index, 1);
    res.json(deletedEntry[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});










module.exports = router;
