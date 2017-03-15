const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');

const router = new express.Router();
const User = mongoose.model('User');
const List = mongoose.model('List');
const ListItem = mongoose.model('ListItem');
const jwtSecret = process.env.JWTSECRET || config.jwtSecret;


function returnAllLists(userId, res) {
  return User
    .findById(userId)
    .populate({
      path: 'lists',
      populate: {
        path: 'listItems',
      },
    })
    .exec((userErr, doc) => {
      if (userErr) console.log('User.populate 💩', userErr);

      return res.status(200).json({
        success: true,
        successMessage: 'Here is the page',
        data: doc.lists,
      });
    });
}

/**
 * Send LIST
 */
router.get('/dashboard', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const userId = jwt.verify(token, jwtSecret).sub;
  if (!token || !userId) {
    return res.status(401).json({
      success: false, successMessage: 'Token 💩.',
    });
  }

  returnAllLists(userId, res);
});


/**
 * Create LIST
 */
router.post('/create/list', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const userId = jwt.verify(token, jwtSecret).sub;
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

  User.findByIdAndUpdate(userId, {
    $push: {
      lists: newList._id,
    },
  }, (err) => {
    if (err) console.log('User.update 💩', err);

    returnAllLists(userId, res);
  });
});

/**
 * Create ITEM
 */
router.post('/create/item', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const userId = jwt.verify(token, jwtSecret).sub;
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

  List.findByIdAndUpdate(newItem.owner, {
    $push: {
      listItems: newItem._id,
    },
  }, (err) => {
    if (err) console.log('User.update 💩', err);

    returnAllLists(userId, res);
  });
});


/**
 * Remove ITEM
 */
router.post('/remove/item', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const userId = jwt.verify(token, jwtSecret).sub;
  if (!token || !userId) {
    return res.status(401).json({
      success: false, successMessage: 'Token  💩',
    });
  }

  const payload = mongoSanitize.sanitize(req.body, { replaceWith: '_' });
  if (!payload || !payload.item) {
    return res.status(401).json({
      success: false, successMessage: 'Payload  💩',
    });
  }

  ListItem
    .findByIdAndRemove(payload.item, {}, (err, doc) => {
      if (err) console.log('Item Remove 💩', err);

      List
        .findByIdAndUpdate(doc.owner, {
          $pull: {
            listItems: payload.item,
          },
        }, (listErr) => {
          if (listErr) { console.log(listErr); }
        });
      returnAllLists(userId, res);
    });
});


/**
 * Remove LIST
 */
router.post('/remove/list', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const userId = jwt.verify(token, jwtSecret).sub;
  if (!token || !userId) {
    return res.status(401).json({
      success: false, successMessage: 'Token  💩',
    });
  }

  const payload = mongoSanitize.sanitize(req.body, { replaceWith: '_' });
  if (!payload || !payload.item) {
    return res.status(401).json({
      success: false, successMessage: 'Payload  💩',
    });
  }

  List
    .findByIdAndRemove(payload.item, {}, (err, doc) => {
      if (err) console.log('Item Remove 💩', err);

      User
        .findByIdAndUpdate(doc.owner, {
          $pull: {
            lists: payload.item,
          },
        }, (listErr) => {
          if (listErr) { console.log(listErr); }
        });
      returnAllLists(userId, res);
    });
});

module.exports = router;
