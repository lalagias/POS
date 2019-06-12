/*const escpos = require('escpos');
const usb = require('usb')


// Select the adapter based on your printer type
const device  = new escpos.USB();
// const device  = new escpos.Network('localhost');
//const device  = new escpos.Serial('COM4');

const options = { encoding: "ISO 8859-7" /!* default *!/ };
// encoding is optional

const printer = new escpos.Printer(device, options);




device.open(function(){
    printer.font('a').align('ct').style('bu').size(2, 2).
    text('\n\n Τραπεζι 10 \n').
    text('1 τζατζικι \n 1 τυροπιτα \n\n\n')
        .cut().close();
});*/
