const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../models/all-models.js');
const shift = models.Shift;
// const escpos = require('escpos');
// const usb = require('usb');
const printing = require('./print');
/*const device  = new escpos.USB();///todo when no printer available then comment this line
const options = { encoding: "ISO 8859-7"  };
const printer = new escpos.Printer(device, options);///todo when no printer available then comment this line*/
//let orderprint='\n\n Τραπεζι ';

// Get all shifts
router.get('/', (req, res, next) => {
    shift.find()
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            res.json(error)
        })
});

// Start new shift
router.post('/start', (req, res, next) => {
    console.log('in paid', req.body);
    shift.create(req.body)
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            res.json(error)
        })
});

// Update shift this will be called on checkout and partial payment to add the total
router.put('/updateShift/:id', (req, res, next) => {
    console.log(req.body);
    shift.findOneAndUpdate({$and:[{_id: mongoose.Types.ObjectId(req.params
            .id)},{finished:false}]
    }, {$inc: {cost: req.body.cost, cash: req.body.cash, card: req.body.card, ordersNo: 1}},{new:true}, (err, updatedShift) => {
        if (err) return handleError(err);

        res.status(200).send({new:req.body.name, shift:updatedShift})
    })
});

// Finish Shift
router.put('/finishShift/:id', (req, res, next) => {
    shift.findOneAndUpdate({$and :[{_id: mongoose.Types.ObjectId(req.params
            .id)
    },{finished:false}]}, {$set: {finished: req.body.finished}},{new:true}, (err, finishShift) => {
        if (err) return handleError(err);

        res.status(200).send({new:req.body.name, shift:finishShift})
    })

});


module.exports = router;