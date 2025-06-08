import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config'; 

const router = express.Router();

const API_KEY = process.env.GEMINI_API_KEY;

router.post('/bot/recommend', async (req, res) => {
  const { mood } = req.body;
  if (!mood) {
    return res.status(400).json({ error: 'Mood is required' });
  }

  if (!API_KEY) {
    console.error('API Key is missing. Make sure it is set in the .env file.');
    return res.status(500).json({ error: 'Server configuration error: API Key missing.' });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`;

    // **FIX #2: Correct request body for the Gemini API**
    const systemInstruction = "You are a food recommendation assistant. Given a mood, suggest a dish or type of food that matches it, with a special emphasis on options available in Meerut.";

    const body = {
      "contents": [
        {
          "role": "user",
          "parts": [
            { "text": `${systemInstruction}\n\nI am feeling ${mood}. What food do you recommend?` }
          ]
        }
      ],
       "generationConfig": {
          "temperature": 0.7,
          "maxOutputTokens": 256,
       }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API returned error:", data.error);
      return res.status(response.status).json({ error: data.error?.message || 'Gemini API error' });
    }

    // **FIX #3: Correctly parse the response from the Gemini API**
    const recommendation = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, no recommendation available at the moment.";

    res.json({ recommendation });

  } catch (error) {
    console.error('Error calling Gemini API:', error.message);
    res.status(500).json({ error: 'Failed to get recommendation.' });
  }
});

export default router;