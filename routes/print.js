const escpos = require('escpos');





function printingCheck (printText){
    const device  = new escpos.USB();///todo when no printer available then comment this line
    const options = { encoding: "ISO 8859-7"  };
    const printer = new escpos.Printer(device, options);///todo when no printer available then comment this line
    if (device.device===null){
        return false;
    }{
        device.open(function(){
            printer.font('a').align('ct').style('bu').size(2, 1).
            text(printText)
                .cut().close();});
        return true;
    }

}

function printingOrder(printText){
    console.log('======================');
    console.log('THIS IS FANTASTIC')
    const device  = new escpos.USB();///todo when no printer available then comment this line
    const options = { encoding: "ISO 8859-7"  };
    const printer = new escpos.Printer(device, options);///todo when no printer available then comment this line
    if (device.device===null){
        return false;
    }
    else {
        device.open(function () {
            printer.font('a').align('ct').style('bu').size(2, 2).text(printText).text('----------------')
                .cut().close();
        });
        return true;
    }
}

module.exports ={
    printingCheck,printingOrder
}
