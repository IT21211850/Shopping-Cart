const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
      {
          userId:{ type: String},
          productId: { type: String},
          productName:{ type: String },
          description:{ type: String },
          quantity: { type: Number, default: 1},
          retailPrice: { type:Number},
          wholesalePrice: { type:Number},
          price: { type:Number,default: 0},
          image: {type:String},
      },{ timeseries: true });

const Cart =  mongoose.model('Cart', cartSchema);

module.exports = Cart;



    


