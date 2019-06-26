const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../models/all-models.js');
const receipts = models.Receipts;
const escpos = require('escpos');
const usb = require('usb');
const printing = require('./print');
/*const device  = new escpos.USB();///todo when no printer available then comment this line
const options = { encoding: "ISO 8859-7"  };
const printer = new escpos.Printer(device, options);///todo when no printer available then comment this line*/
//let orderprint='\n\n Τραπεζι ';
//
router.get('/', (req, res, next) => {
    console.log('in simple')
    receipts.find()
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            res.json(error)
        })
})

router.get('/paid', (req, res, next) => {
    console.log('in paid ')
    receipts.find().where('paid').equals(true)
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            res.json(error)
        })
})

router.get('/unpaid', (req, res, next) => {
    receipts.find().where("paid").equals(false)
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            res.json(error)
        })

})

//add order to receipt
router.put('/:id', (req, res, next) => {
    //console.log(req.body)
    let orderprint = req.body.name+'\n\n';
    receipts.find().where("_id").equals(req.params.id).then(results=> {
        //console.log(results);
        if (results[0].items.length===0){
            console.log('1')
            for (let i=0 ; i<req.body.bill.items.length; i++){
                orderprint += '\n' + req.body.bill.items[i].name+' '+req.body.bill.items[i].quantity;
            }
        }
        else {
            console.log('else');
            let alfa =[];
            let beta = [];
            alfa =req.body.bill.items;
            beta = results[0].items;
            for (let i =0; i<alfa.length; i++){
                let found = false;
                for (let j=0; j<beta.length; j++){
                    if ((alfa[i].name=== beta[j].name )&& (alfa[i].quantity !== beta[j].quantity) ){
                        found=true;
                        orderprint += '\n' +alfa[i].name+' '+ (alfa[i].quantity - beta[i].quantity)
                    }
                }
                if (!found && (i >= beta.length) ){
                    orderprint += '\n' + alfa[i].name+' '+alfa[i].quantity
                }
                found = false

            }

        }
        ///TODO uncomment this for printing
        let bool=false;
        while(!bool)
        {

            try{
                bool= printing.printingOrder(orderprint);
                if (bool){
                    receipts.update({_id: req.params.id}, {
                        'items': req.body.bill.items,
                        'total': req.body.bill.total,
                        'paid': req.body.paid,
                        'total': req.body.bill.total
                    })
                        .then(result => {
                            res.json(result)

                        })
                        .catch(error => res.json("error" + error));
                }

            }
            catch (e) {
                console.log(e);
                res.send('Error! check printer');
            }
        }
       /* device.open(function(){
            printer.font('a').align('ct').style('bu').size(2, 2).
            text(orderprint).
            text('----------------')
                .cut().close();});*/


    });



});

module.exports = router;


///TODO: when checkout delete receipt and sav it to another document
///TODO: when new table print order at once

/*
*   let found= false;
            let cnt=0;
            results[0].items.forEach(n=>{
                for (let a=0; a<req.body.bill.items.length;a++ ){
                    if (n.name.equals(req.body.bill.items[a].name)){
                        orderprint += '\n' +req.body.bill.items[a].name+' '+ (req.body.bill.items[a].quantity - results[0].items[a].quantity)
                        found=true;
                        cnt=0;
                    }
                    else {
                        if (cnt<){

                        }
                    }
                }
            })
            for (let i=0; i<results[0].items.length; i++){

                if (results[0].items[i].name.equals()){
                    console.log('found match ')
                }
            }
            */