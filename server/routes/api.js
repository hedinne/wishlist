const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');

const router = new express.Router();
const User = mongoose.model('User');
const List = mongoose.model('List');

router.get('/dashboard', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const userId = jwt.verify(token, config.jwtSecret).sub;
  if (!token || !userId) {
    return res.status(401).json({
      success: false, successMessage: 'Token 💩.',
    });
  }

  User
    .findById(userId)
    .populate('lists')
    .exec((err, doc) => {
      if (err) console.log('User.populate 💩', err);

      return res.status(200).json({
        success: true,
        successMessage: 'Here is the page',
        data: doc.lists,
      });
    });
});


router.post('/create/list', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const userId = jwt.verify(token, config.jwtSecret).sub;
  if (!token || !userId) {
    return res.status(401).json({
      success: false, successMessage: 'Token  💩',
    });
  }

  const payload = mongoSanitize.sanitize(req.body, { replaceWith: '_' });
  if (!payload || !payload.value) {
    return res.status(401).json({
      success: false, successMessage: 'Payload  💩',
    });
  }

  const newList = new List({
    title: payload.value,
    owner: userId,
  });
  newList.save();

  User.findOneAndUpdate(userId, {
    $push: {
      lists: newList._id,
    },
  }, (err) => {
    if (err) console.log('User.update 💩', err);
  });

  User
    .findById(userId)
    .populate('lists')
    .exec((err, user) => {
      if (err) console.log('User.populate 💩', err);

      return res.status(200).json({
        success: true,
        successMessage: 'New list created.',
        data: user.lists,
      });
    });
});

module.exports = router;
