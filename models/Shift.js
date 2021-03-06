// MongoDB model that handles the menu items

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('./connection-string'));
}

var newSchema = new Schema({

        'name': { type: String, required: true},
        'ordersNo': { type: Number, required: true },
        'cost': { type: Number, required: true },
        'cash': { type: Number, required: true },
        'card': { type: Number, required: true },
        'finished': { type: Boolean, default: false },
        'createdAt': { type: Date, default: Date.now },
        'updatedAt': { type: Date, default: Date.now }
    },
    { collection: 'shift'}
);

newSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});

newSchema.pre('update', function() {
    this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
    this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model('Shift', newSchema);

//todo make this to create collection