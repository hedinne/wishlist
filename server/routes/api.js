const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const mongoose = require('mongoose');

const router = new express.Router();
require('../models/user'); // eslint-disable-line
const User = mongoose.model('User');


router.get('/dashboard', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) { return res.status(401).end(); }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;
    // User.findById(userId, (userErr, user) => {
    //   user.list.push(userId);
    //   user.save();
    //   return res.status(200).json({
    //     message: 'Your wishlist:',
    //     list: user.list,
    //   });
    // });
  });
  return res.status(200);
});

router.post('/dashboard/items', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  // if (!token) { return res.status(401).end(); }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    const userId = decoded.sub;


    console.log('Type:', typeof req.body);
    console.log('Body:', req.body);

    // User.findById(userId, (userErr, user) => {
    //   user.list.push(req.body.value);
    //   user.save();
    // });
  });
  return res.status(200).json({
    success: true,
    message: 'Hlutur móttekinn',
    item: req.body,
  });
});

module.exports = router;
