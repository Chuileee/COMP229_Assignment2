let mongoose = require('mongoose');

//Create Model of Student
let projectModel = mongoose.Schema(
    {
        "pname" : String,
        "pdescription" : String,
        "pdeadline" : Date,
        "loanApplied" : { type: Boolean, default: false },
        "createdDate": { type: Date, default: Date.now },
        "updatedDate": { type: Date, default: Date.now }
    },
    {
        collection: "project",
        timestamps: { 
            createdAt: 'createdDate',
            updatedAt: 'updatedDate'
        }
    }
);

module.exports = mongoose.model('Project', projectModel);
