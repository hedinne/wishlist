const express = require('express');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: 'Here will your wishlists come.',
  });
});

module.exports = router;
