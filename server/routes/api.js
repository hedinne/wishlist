const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();

const jwtSecret = process.env.JWTSECRET;

const router = new express.Router();
const User = mongoose.model('User');
const List = mongoose.model('List');
const ListItem = mongoose.model('ListItem');


function returnAllLists(userId, res) {
  return User.findById(userId)
    .populate({
      path: 'lists',
      populate: {
        path: 'listItems',
      },
    })
    .exec((userErr, doc) => {
      if (userErr) console.error('User.populate error', userErr);

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
      success: false,
      successMessage: 'Token error.',
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
      success: false,
      successMessage: 'Token  error',
    });
  }

  const payload = mongoSanitize.sanitize(req.body, { replaceWith: '_' });
  if (!payload || !payload.title) {
    return res.status(401).json({
      success: false,
      successMessage: 'Payload Error',
    });
  }

  const newList = new List({
    title: payload.title,
    owner: userId,
  });
  newList.save();

  User.findByIdAndUpdate(
    userId,
    {
      $push: {
        lists: newList._id,
      },
    },
  (err) => {
    if (err) console.error('User.update Error', err);

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
      success: false,
      successMessage: 'Token Error',
    });
  }

  const payload = mongoSanitize.sanitize(req.body, { replaceWith: '_' });
  if (!payload || !payload.title) {
    return res.status(401).json({
      success: false,
      successMessage: 'Payload Error',
    });
  }

  const newItem = new ListItem({
    title: payload.title,
    description: payload.description,
    link: payload.link,
    price: payload.price,
    marked: payload.marked,
    owner: payload.owner,
  });
  newItem.save();

  List.findByIdAndUpdate(
    newItem.owner,
    {
      $push: {
        listItems: newItem._id,
      },
    },
  (err) => {
    if (err) console.error('User.update Error', err);

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
      success: false,
      successMessage: 'Token Error',
    });
  }

  const payload = mongoSanitize.sanitize(req.body, { replaceWith: '_' });
  if (!payload || !payload.item) {
    return res.status(401).json({
      success: false,
      successMessage: 'Payload Error',
    });
  }

  ListItem.findByIdAndRemove(payload.item, {}, (err, doc) => {
    if (err) console.error('Item Remove Error', err);

    List.findByIdAndUpdate(
      doc.owner,
      {
        $pull: {
          listItems: payload.item,
        },
      },
    (listErr) => {
      if (listErr) {
        console.error(listErr);
      }
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
      success: false,
      successMessage: 'Token Error',
    });
  }

  const payload = mongoSanitize.sanitize(req.body, { replaceWith: '_' });
  if (!payload || !payload.item) {
    return res.status(401).json({
      success: false,
      successMessage: 'Payload Error',
    });
  }

  List.findByIdAndRemove(payload.item, {}, (err, doc) => {
    if (err) console.error('Item Remove Error', err);

    User.findByIdAndUpdate(
      doc.owner,
      {
        $pull: {
          lists: payload.item,
        },
      },
    (listErr) => {
      if (listErr) {
        console.error(listErr);
      }
    });
    returnAllLists(userId, res);
  });
});

module.exports = router;
