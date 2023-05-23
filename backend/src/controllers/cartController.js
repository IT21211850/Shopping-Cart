const express = require("express"); 
const Cart = require("../models/cart");  
const Router = express.Router();

/**
 * Add cart details controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.post("/addCart", async (req, res) => {
    try { 
      const cart = new Cart(
        {
          "userId":req.body.userId,
          "productId": req.body.productId,
          "productName":req.body.productName,
          "description":req.body.description,
          "quantity": req.body.quantity,
          "retailPrice": req.body.retailPrice,
          "wholesalePrice": req.body.wholesalePrice,
          "price":req.body.price,
          "image":req.body.image
      });

      console.log(cart);
      await cart.save();
      res.send("successfully new cart added to the system.");
    } catch (error) {
      res
        .status(400)
        .send("Error while uploading cart details. Try again later. " + error);
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);
 
/**
 * update cart details controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.put("/editCart/:id", async (req, res) => {
  try {
    console.log(req.body.quantity,req.params.id) 
    let cart = await Cart.find({"_id":req.params.id})
   
    cart =  await Cart.findByIdAndUpdate(req.params.id, {quantity:req.body.quantity}, { new: true });
    res.json(cart);
    console.log(cart)
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

/**
 * delete cart details controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.delete("/deleteCart/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const removed = await Cart.deleteOne({ _id: req.params.id });
    if (!removed)
      throw Error("Something went wrong while trying to delete the file");

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

Router.get("/getCart/:id", async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    const cart = await Cart.find({ "_id":id });
    res.send(cart);
  } catch (error) {
    res
      .status(400)
      .send("Error while getting cart details. Try again later." + error);
  }
}); 

Router.get("/getAllCart", async (req, res) => {
  try {
    const cart = await Cart.find({});
    const sortedByCreationDate = cart.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of cart. Try again later." + error);
  }
});

module.exports = Router;
