const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inquirySchema = new Schema({
    
    firstname:
    {
        type:String,
        required:true
    },
    lastname:
    {
        type:String,
        required:true
    },
    emailAddress:
    {
        type:String,
        required:true
    },
    description:
    {
        type:String,
        required:true
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    },
    inquiryType:
    {
        type:String,
        default:"New"
    }
});

// for every schema we need to create a schema per collection,
// we must create a model object,
// model will allow to perform CRUD operations on a given collection

const inquiryModel = mongoose.model('Inquiry', inquirySchema)

module.exports = inquiryModel;