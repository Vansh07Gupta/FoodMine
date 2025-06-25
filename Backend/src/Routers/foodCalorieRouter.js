import express from 'express';
const router = express.Router();
import fetch from 'node-fetch';

router.get('/searchByCalories', async (req, res) => {
  const { calories } = req.query;
  const API_KEY = process.env.SPOONACULAR_API_KEY;

  if (!calories || isNaN(calories)) {
    return res.status(400).json({ error: 'Please provide a valid calorie value.' });
  }

  const min = parseInt(calories) - 50;
  const max = parseInt(calories) + 50;

  const url = `https://api.spoonacular.com/recipes/findByNutrients?minCalories=${min}&maxCalories=${max}&number=5&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status !== 200) {
      return res.status(502).json({ error: data.message || 'Error from Spoonacular API' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching from Spoonacular:', error);
    res.status(500).json({ error: "Spoonacular fetch failed" });
  }
});

export default router;
