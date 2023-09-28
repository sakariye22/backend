const express = require('express');
const router = express.Router();
const fs = require('fs');

let reviews = [];

// Läs in befintlig data från JSON-filer när servern startar
fs.readFile('reviews.json', 'utf8', (err, data) => {
  if (!err) {
    reviews = JSON.parse(data);
  }
});

// Funktioner för att spara data till JSON-filer
function saveReviewsToFile() {
  fs.writeFile('reviews.json', JSON.stringify(reviews), 'utf8', (err) => {
    if (err) {
      console.error('Error writing reviews to file:', err);
    }
  });
}

// Skapa en ny recension för en karaktär med ett specifikt ID
router.post('/:id/reviews', (req, res) => {
  const characterId = parseInt(req.params.id);
  const { username, text, rating } = req.body;

  // Här kan du lägga till validering och logik för att skapa en recension
  // ...

  const newReview = {
    id: reviews.length + 1,
    characterId: characterId,
    username: username,
    text: text,
    rating: rating,
  };

  reviews.push(newReview);
  saveReviewsToFile();

  res.status(201).json(newReview);
});

// Hämta en specifik recension för en karaktär med ett specifikt ID
router.get('/:characterId/reviews/:reviewId', (req, res) => {
  const characterId = parseInt(req.params.characterId);
  const reviewId = parseInt(req.params.reviewId);

  // Här kan du lägga till logik för att hämta en specifik recension
  // ...

  const review = reviews.find((rev) => rev.id === reviewId);

  if (!review || review.characterId !== characterId) {
    return res.status(404).json({ error: 'Review not found' });
  }

  res.json(review);
});

// Ta bort en specifik recension för en karaktär med ett specifikt ID
router.delete('/:characterId/reviews/:reviewId', (req, res) => {
  const characterId = parseInt(req.params.characterId);
  const reviewId = parseInt(req.params.reviewId);

  // Här kan du lägga till logik för att ta bort en specifik recension
  // ...

  const reviewIndex = reviews.findIndex((rev) => rev.id === reviewId);

  if (reviewIndex === -1 || reviews[reviewIndex].characterId !== characterId) {
    return res.status(404).json({ error: 'Review not found' });
  }

  reviews.splice(reviewIndex, 1);
  saveReviewsToFile();

  res.status(204).send();
});

module.exports = router;
