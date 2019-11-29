 const escpos = require('escpos');
function printingCheck (printText){
     const device  = new escpos.USB();///todo when no printer available then comment this line
     const options = { encoding: "ISO 8859-7"  };
     const printer = new escpos.Printer(device, options);///todo when no printer available then comment this line
     //console.log(printer.buffer)
    //device.
    //console.log(device.device)
    if (device.device===null){
         return false;
     }{
try {
    device.open(function () {
        printer.font('a').align('ct').style('bu').size(2, 1).text(printText)
            .cut().close()//.close();

    });
    //console.log(printer.buffer)
    return true;
}
catch (e) {
    console.log('check exception', e)
}
     }

 }

 function printingOrder(printText){
     const device  = new escpos.USB();///todo when no printer available then comment this line
     const options = { encoding: "ISO 8859-7"  };
     const printer = new escpos.Printer(device, options);///todo when no printer available then comment this line
     let printed = false;
    // console.log('before',printer.buffer)
     while(!printed) {
         try {
             if (device.device === null) {
                 return false;
             } else {
                 device.open(function () {
                     printer.font('a').align('ct').style('bu').size(2, 2).text(printText).text('----------------')
                         .cut().close()//close();
                     //console.log('after', printer.buffer)
                 });
                 printed= true;
                 return true;
             }
         } catch (e) {
             console.log('order exception', e)
         }
     }

 }



 module.exports.printingCheck= printingCheck;
 module.exports.printingOrder= printingOrder;
