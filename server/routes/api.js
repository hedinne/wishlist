const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');

const router = new express.Router();
const User = mongoose.model('User');
const List = mongoose.model('List');
const ListItem = mongoose.model('ListItem');

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
    .populate({
      path: 'lists',
      populate: {
        path: 'listItems',
      },
    })
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
  if (!payload || !payload.title) {
    return res.status(401).json({
      success: false, successMessage: 'Payload  💩',
    });
  }

  const newList = new List({
    title: payload.title,
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

router.post('/create/item', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const userId = jwt.verify(token, config.jwtSecret).sub;
  if (!token || !userId) {
    return res.status(401).json({
      success: false, successMessage: 'Token  💩',
    });
  }

  const payload = mongoSanitize.sanitize(req.body, { replaceWith: '_' });
  if (!payload || !payload.title) {
    return res.status(401).json({
      success: false, successMessage: 'Payload  💩',
    });
  }

  const newItem = new ListItem({
    title: payload.title,
    // description: payload.description,
    // link: payload.link,
    // price: payload.price,
    // marked: payload.marked,
    owner: payload.owner,
  });
  newItem.save();

  List.findOneAndUpdate(newItem.owner, {
    $push: {
      listItems: newItem._id,
    },
  }, (err) => {
    if (err) console.log('User.update 💩', err);
  });

  List
    .findById(newItem.owner)
    .populate('listItems')
    .exec((err, list) => {
      if (err) console.log('User.populate 💩', err);

      return res.status(200).json({
        success: true,
        successMessage: 'New item created.',
        data: list,
      });
    });
});

module.exports = router;
