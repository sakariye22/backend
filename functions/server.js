const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const entry = data.find(item => item.id === id);

  if (!entry) {
    return res.status(404).json({ error: 'Entry not found' });
  }

  res.json(entry);
});




module.exports = app;
