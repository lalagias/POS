const escpos = require('escpos');
let usb = require('usb');

const device  = new escpos.USB();///todo when no printer available then comment this line
const options = { encoding: "ISO 8859-7" };
const printer = new escpos.Printer(device, options);///todo when no printer available then comment this line



if (device.device==null){
    console.log('d null ')
}
try {
    console.log(usb.getDeviceList().length)
}
catch (e) {

}

console.log(escpos.USB.findPrinter());