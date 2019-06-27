const models = require('./models/all-models.js');
const receipt = models.Receipts;


let today = new Date();
let newday= new Date();
newday.setDate(today.getDate()-1);
newday.setHours(12)
console.log(newday.toISOString())
console.log(today.toISOString())
receipt.find({ $and:[ {"paidTime":{ $gt: newday.toISOString()}},
        {"paidTime":{$lt: today.toISOString()}}] }, (err,result)=>{
    if (err) return handleError(err);
    let sum =0;
    result.forEach(a=>{
        sum +=a.total;
    });
    console.log(result.length)
    console.log(sum)
    //res.status(200).send({Day:today, totalSales:sum})
})
