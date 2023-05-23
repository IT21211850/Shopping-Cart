
const mongoose = require('mongoose')

const Schema = mongoose.Schema


const prodSchema= new Schema({
   
    name: String,
    descr:  String,
    type: String,
    sub_type: String,
    expDate : Date,
    offShelf_Life: Number,
    NoOfUnits: Number,
    retailPrice: Number,
    wholesalePrice: Number,
    discountedAt: Number,
    Image: String,
    archived: Boolean,
    archived_on: Date

},{timestamps: true})

module.exports = mongoose.model('Products', prodSchema, 'Inventory')