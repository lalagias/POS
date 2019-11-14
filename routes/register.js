const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../models/all-models.js');
const register = models.Register;

router.get('/', (req, res, next) => {
  register.find()
    .then(results => {
      res.json(results)
    })
    .catch(error => {
      res.json(error)
    })
});

router.post('/open', (req, res, next) => {
  register.create(req.body)
    .then(results => {
      res.json(results)
    })
    .catch(error => {
      res.json(error)
    })
});

router.put('/updateRegister/:id', (req, res, next) => {
  console.log(req.body);
  register.findOneAndUpdate({
    $and: [{
      _id: mongoose.Types.ObjectId(req.params
        .id)
    }, {closed: false}]
  }, {$inc: {total: req.body.total, card: req.body.card, cash: req.body.cash}}, {new: true}, (err, updateRegister) => {
    console.log(err);
    if (err) return handleError(err);
    res.status(200).send({new: req.body.name, register: updateRegister})
  })
});

router.post('/close/:id', (req, res, next) => {
  register.findOneAndUpdate({
    $and: [{
      _id: mongoose.Types.ObjectId(req.params.id)
    }, {closed: false}]
  }, {$set: {closed: req.body.closed}}, {new: true}, (err, closeRegister) => {
    if (err) return handleError(err);

    res.status(200).send({register: closeRegister})

  })
});

module.exports = router;