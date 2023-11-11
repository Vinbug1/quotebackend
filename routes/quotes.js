const express = require('express');
const router = express.Router();
const { Quote } = require('../models/quote');



router.get(`/`, async (req, res) => {
    try {
    const quoteList = await Quote.find();
    res.send(quoteList);
    } catch (error){
        console.error("Error getting Quotes:", error);
      res.status(500).send("Internal server error");
    }
});



// Create a new quote
router.post('/', async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const newQuote = new Quote({ description });
    const savedQuote = await newQuote.save();

    if (!savedQuote) {
      return res.status(500).json({ error: 'Failed to create the quote' });
    }

    res.status(201).json(savedQuote);
  } catch (error) {
    console.error('Error creating a new quote:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;
