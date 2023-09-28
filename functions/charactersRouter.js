const express = require('express');
const router = express.Router();
const fs = require('fs');

let characters = [];

// Läs in befintlig data från JSON-filer när servern startar
fs.readFile('characters.json', 'utf8', (err, data) => {
  if (!err) {
    characters = JSON.parse(data);
  }
});

// Funktioner för att spara data till JSON-filer
function saveCharactersToFile() {
  fs.writeFile('characters.json', JSON.stringify(characters), 'utf8', (err) => {
    if (err) {
      console.error('Error writing characters to file:', err);
    }
  });
}

// Skapa en ny karaktär
router.post('/', (req, res) => {
  const newCharacter = req.body;

  // Tilldela ett nytt ID till karaktären
  newCharacter.id = characters.length;
  
  characters.push(newCharacter);

  saveCharactersToFile();

  res.status(201).json(newCharacter);
});

// Hämta alla karaktärer
router.get('/', (req, res) => {
  res.json(characters);
});

// Hämta en karaktär med ett specifikt ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const character = characters.find((item) => item.id === id);

  if (!character) {
    return res.status(404).json({ error: 'Character not found' });
  }

  res.json(character);
});

// Uppdatera en befintlig karaktär med ett specifikt ID
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedCharacter = req.body;

  const characterIndex = characters.findIndex((character) => character.id === id);

  if (characterIndex === -1) {
    return res.status(404).json({ error: 'Character not found' });
  }

  // Uppdatera karaktären med den nya datan
  characters[characterIndex] = { ...characters[characterIndex], ...updatedCharacter };

  saveCharactersToFile();

  res.json(characters[characterIndex]);
});

// Ta bort en karaktär med ett specifikt ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const characterIndex = characters.findIndex((character) => character.id === id);

  if (characterIndex === -1) {
    return res.status(404).json({ error: 'Character not found' });
  }

  characters.splice(characterIndex, 1);

  saveCharactersToFile();

  res.status(204).send();
});

// Skapa flera nya karaktärer samtidigt
router.post('/many', (req, res) => {
  const newCharacters = req.body;

  // Tilldela nya ID till karaktärerna
  newCharacters.forEach((character, index) => {
    character.id = characters.length + index;
  });

  characters = characters.concat(newCharacters);

  saveCharactersToFile();

  res.status(201).json(newCharacters);
});

module.exports = router;
