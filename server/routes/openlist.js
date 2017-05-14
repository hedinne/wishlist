const express = require('express');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const List = mongoose.model('List');
const router = new express.Router();

router.post('/', (req, res) => {
  const id = mongoSanitize.sanitize(req.body.id);
  if (!id.match(/[a-z0-9]{24}/g)) {
    return res.status(401).json({
      success: false,
      successMessage: 'Error',
    });
  }

  List.findById(id).populate({ path: 'listItems' }).exec((userErr, doc) => {
    if (userErr) console.error('Error', userErr);
    if (doc) {
      return res.status(200).json({
        success: true,
        successMessage: 'Here is the list',
        data: doc,
      });
    }
    return res.status(401).json({
      success: false,
      successMessage: 'Error',
    });
  });
});

module.exports = router;
