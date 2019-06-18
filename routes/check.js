// Route to handle all calls for /check

const express   = require('express');
const router    = express.Router();
const mongoose 	= require('mongoose');
const axios = require('axios')
const models 	= require('../models/all-models.js');
const receipt = models.Receipts;
const menu = models.Menu;
const printing = require('./print.js');

// Get all receipts that have not been paid and return them
router.get('/', (req,res,next) => {
    console.log(req)
    receipt.find()
        .where('paid')
        .equals(false)
        .then(result =>{
            res.json(result);
        })
        .catch(error =>{
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
        .create({ table: req.body.table, guests: req.body.guests, server: req.body.server })
        .then(results => {
            res.json(results)
        })
        .catch(error =>
            res.json(error)
        );

});

// Update check information
router.put('/:id', (req, res, next) => {
    //console.log(req);
    menu.find().then(m=>{
        receipt.findById( req.params.id,(err,check)=>{
            if (err) return handleError(err);

            receipt.find().where("_id").equals(req.params.id).then(results=> {
                console.log(results)
                let print = '\n\n' + results[0].table;
                let total =0 ;
                for (let i=0; i<results[0].items.length; i++){
                    for (let j=0; j<m.length ; j++){
                        if (m[j].name=== (results[0].items[i].name)){
                            print+='\n' + results[0].items[i].name +' \n' + results[0].items[i].quantity +'τμχ     ' + m[j].cost+ 'eu';
                            total+= results[0].items[i].quantity* m[j].cost;
                        }
                    }
                }
                print += '\n\n Total: ' + parseFloat(total).toFixed(2) + '\n\n\n';//results[0].total;
                let bool=false;
                while(!bool)
                {
                    try{
                        bool= true//printing.printingCheck(print);
                        if (bool){
                            check.paid= req.body.paid;
                            check.card = req.body.card;
                            check.amountTendered = req.body.amountTendered;
                            check.paymentType = req.body.paymentType;
                            check.paidTime = Date.now();
                            check.save((err,updatedCheck)=>{
                                if (err) return handleError(err);
                                res.send(updatedCheck)
                            });
                        }
                    }
                    catch (e) {
                        console.log(e);
                        res.send('Error! check printer');
                    }
                }

                /*if (bool){
                    check.paid= req.body.paid;
                    check.card = req.body.card;
                    check.amountTendered = req.body.amountTendered;
                    check.paymentType = req.body.paymentType;
                    check.paidTime = Date.now();
                    check.save((err,updatedCheck)=>{
                        if (err) return handleError(err);
                        res.send(updatedCheck)
                    });
                }
                else{
                    res.send('Error! check printer');
                }*/

            })
        });
    })
});

// Query for check based on ID field
router.get('/:id', (req, res, next) => {
    console.log('req.params.id',req.params.id);
    receipt.findOneAndUpdate({
        where: {
            _id: req.params.id
        }
    })
        .then(result => {
            console.log(result)
            res.json(result)
        })
        .catch(error => {
            console.log(error)
            res.json(error);
        })
});

// Delete Check based on ID
router.delete('/delete/:id',(req,res,next) => {
    receipt.remove({_id: req.params.id})
        .then(result => res.json(result))
        .catch(error => res.json(error));
});

router.put('/updateTable/:id',(req,res,next) => {
    receipt.findOne({
        where: {
            _id: req.params.id
        }
        .then(result => {
            console.log("Changed table from "+ result.table +"  to  "+ req.body.table )
            result.table = req.body.table

            result.save((err,updatedCheck)=>{
                if (err) return handleError(err);
                res.send(updatedCheck)
            });



            res.json(result);

        })
        .catch(error => res.json(error))})
});

module.exports = router;