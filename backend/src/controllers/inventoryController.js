const mongoose  = require("mongoose");
const Inventory = require("../models/inventory");

const getInvetory = async (req, res) => {
    const products = await Inventory.find({
        archived: true
    }).sort({ createdAt: -1 })

    console.log('fetched archived products');
    res.json(products)
}
const getAProduct = async (req, res) => {
    const { id } = req.params
    //revisit ths validation after importing nanoid

    const product = await Inventory.findById({_id:id})

    if (!product) {
        return res.json({ error: 'no matching products' })
    }

    res.json(product)
}

module.exports = {getInvetory,getAProduct};
