// Route to handle all calls for /check

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../models/all-models.js');
const escpos = require('escpos');
const usb = require('usb');
const receipt = models.Receipts;
const menu = models.Menu;
const printing = require('./print.js');
/*const device  = new escpos.USB();///todo when no printer available then comment this line
const options = { encoding: "ISO 8859-7"  };
const printer = new escpos.Printer(device, options);*/

// Get all receipts that have not been paid and return them
router.get('/', (req, res, next) => {
    console.log(req);
    receipt.find()
        .where('paid')
        .equals(false)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json(error);
        })
});


// Get all paid reciepts and return them
router.get('/paid', (req, res, next) => {
    receipt.find().where('paid').equals(true)
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            res.json(error)
        })
});

// Get all receipts that have not been paid and return them
router.get('/unpaid', (req, res, next) => {
    receipt.find().where("paid").equals(false)
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            res.json(error)
        })

});

//create new reciept
router.post('/seat', (req, res, next) => {
    receipt
        .create({table: req.body.table, guests: req.body.guests, server: req.body.server})
        .then(results => {
            res.json(results)
        })
        .catch(error =>
            res.json(error)
        );

});

// Update check information
router.put('/:id', (req, res, next) => {

    console.log('req.params.id]', req.params.id);
    console.log(req.body);
    menu.find().then(m => {
        receipt.findByIdAndUpdate(req.params.id, {new: true},(err, check) => {

            if (err) return console.log(err);

            receipt.find().where("_id").equals(req.params.id).then(results => {
                console.log('results', results);
                let print = '\n\n' + results[0].table;
                let total = 0;
                for (let i = 0; i < results[0].items.length; i++) {
                    for (let j = 0; j < m.length; j++) {
                        if (m[j].name === (results[0].items[i].name)) {
                            print += '\n' + results[0].items[i].name + ' \n' + results[0].items[i].quantity + 'τμχ     ' + m[j].cost + 'eu';
                            total += results[0].items[i].quantity * m[j].cost;
                        }
                    }
                }
                print += '\n\n Total: ' + parseFloat(total).toFixed(2) + '\n\n\n';//results[0].total;
                 let bool = false;
                 while (!bool) {
                    try {
                        console.log('check print');
                        bool = printing.printingCheck(print);
                        if (bool) {
                            check.paid = req.body.paid;
                            check.card = req.body.card;
                            check.amountTendered = req.body.amountTendered;
                            check.paymentType = req.body.paymentType;
                            check.paidTime = Date.now();
                            check.save((err, updatedCheck) => {
                                if (err) return handleError(err);
                                //printer.close();
                                res.send(updatedCheck)
                            });
                        }
                    }
                    catch (e) {
                        console.log('exception', e);
                        res.send('Error! check printer');
                    }
                 }
            })
        });
    })
});

// Query for check based on ID field
router.get('/:id', (req, res, next) => {
    console.log('req.params.id', req.params.id);
    receipt.findByIdAndUpdate(req.params.id, {new: true})
        .then(result => {
            console.log(result);
            res.json(result)
        })
        .catch(error => {
            console.log(error);
            res.json(error);
        })
});

// Delete Check based on ID
router.delete('/delete/:id', (req, res, next) => {
    receipt.remove({_id: req.params.id})
        .then(result => res.json(result))
        .catch(error => res.json(error));
});

//get all paid checks for a shift
router.get('/shift/total/:print', async (req, res, next) => {
    let today = new Date();
    let newday = new Date();
    console.log(req.params);
    newday.setDate(today.getDate() - 1);
    newday.setHours(12);
    console.log(newday.toISOString());
    receipt.find({
        $and: [{"paidTime": {$gt: newday.toISOString()}},
            {"paidTime": {$lt: today.toISOString()}}]
    }, (err, result) => {
        if (err) return handleError(err);
        let sum = 0;
        result.forEach(a => {
            sum += a.total;
        });
        if (result.length>=0 ){
            if (req.params.print === "true") printing.printingOrder(newday.toISOString().split('T')[0] +"\nToday's total is :\n TOTAL : "+ sum)
        }
        res.status(200).send({Day: today, totalSales: sum})

    })
});

// Update Table (changeTable function)

router.put('/updateTable/:id', async (req, res, next) => {
    //console.log('req.body:', req.body);
    //console.log('req.params:', req.params);
    receipt.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params
            .id)
    }, {$set: {table: req.body.name}}, (err, updatedCheck) => {
        if (err) return handleError(err);

        res.status(200).send({new:req.body.name, oldTable:updatedCheck})
    })

});

module.exports = router;
