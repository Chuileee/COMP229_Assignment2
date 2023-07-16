let mongoose = require('mongoose');

//Create Model of Student
let contactModel = mongoose.Schema(
    {
        "fname" : String,
        "lname" : String,
        "cphone" : Number,
        "cemail" : String,
        "cmessage" : String,
        "createdDate": { type: Date, default: Date.now },
        "updatedDate": { type: Date, default: Date.now }
    },
    {
        collection: "contact",
        timestamps: { 
            createdAt: 'createdDate',
            updatedAt: 'updatedDate'
        }
    }
);

module.exports = mongoose.model('Contact', contactModel);
