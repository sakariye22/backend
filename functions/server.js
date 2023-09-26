const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(express.json());
app.use(cors());

// Load character data from characters.json
let characters = [];

fs.readFile('characters.json', 'utf8', (err, data) => {
  if (!err) {
    characters = JSON.parse(data);
  }
});

function saveCharactersToFile() {
  fs.writeFile('characters.json', JSON.stringify(characters), 'utf8', (err) => {
    if (err) {
      console.error('Error writing characters to file:', err);
    }
  });
}

// Add a new character
app.post('/data', (req, res) => {
  const newCharacter = req.body;

  // Assign a new ID to the character
  newCharacter.id = characters.length;
  
  characters.push(newCharacter);

  saveCharactersToFile();

  res.status(201).json(newCharacter);
});

// Delete a character by ID
app.delete('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const characterIndex = characters.findIndex((character) => character.id === id);

  if (characterIndex === -1) {
    return res.status(404).json({ error: 'Character not found' });
  }

  characters.splice(characterIndex, 1);

  saveCharactersToFile();

  res.status(204).send();
});

// Retrieve all characters
app.get('/data', (req, res) => {
  res.json(characters);
});

// Retrieve a character by ID
app.get('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const character = characters.find((item) => item.id === id);

  if (!character) {
    return res.status(404).json({ error: 'Character not found' });
  }

  res.json(character);
});

// Update an existing character by ID
app.patch('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedCharacter = req.body;

  const characterIndex = characters.findIndex((character) => character.id === id);

  if (characterIndex === -1) {
    return res.status(404).json({ error: 'Character not found' });
  }

  // Update the character with the new data
  characters[characterIndex] = { ...characters[characterIndex], ...updatedCharacter };

  saveCharactersToFile();

  res.json(characters[characterIndex]);
});

// Add multiple new characters
app.post('/data/many', (req, res) => {
  const newCharacters = req.body;

  // Assign new IDs to the characters
  newCharacters.forEach((character, index) => {
    character.id = characters.length + index;
  });

  characters = characters.concat(newCharacters);

  saveCharactersToFile();

  res.status(201).json(newCharacters);
});



module.exports = app;
