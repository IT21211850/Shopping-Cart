import React, { useState, useEffect } from 'react';
import api from '../api/posts';
import './style.css'
import axios from "axios";
import { json } from 'react-router-dom';


function Home() {
  
  //retrive data from inventory collection
  const [inventory, setInventory] = useState([]);

  //set product details into cart
  const [cart, setCart] = useState([]);


  useEffect(() => {
    const getInventory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getInventory');
        console.log(response.data);
        localStorage.setItem( "userId","644768af4c621d2534ca489d")
        setInventory(response.data);
      } catch (error) {
        if (error.response) {
          // Not in the 200 range
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    };

    getInventory();
  }, []);

  const AddItemToCart = async (product)  => {
    const cartItem ={
      userId:localStorage.getItem("userId"),
      productId: product._id,
      productName:product.name,
      description:product.descr,
      image:product.Image,
      quantity: 1,
      retailPrice: product.retailPrice,
      wholesalePrice: product.wholesalePrice,
      price: Number.parseInt(product.retailPrice)
    } 
    console.log("cart : " + cartItem);
    try{
        await axios.post("http://localhost:5000/cart/addCart",cartItem).then((result)=>{
        console.log(result)
        alert("Item added to cart")
        }).catch((error)=>{
        console.log("Error !!! " + error)
        })
    }catch(e){
      console.log(e)
    }
  };


  //set product details into cart function
  const addToCart = async (product)  => {
    const cartItem ={
      "userId":localStorage.getItem("userId"),
       "cartItems":
           {
               "product": product._id,
               "productName":product.name,
               "description":product.descr,
               "quantity": 1,
               "retailPrice": product.retailPrice,
               "wholesalePrice": product.wholesalePrice,
               "price": 0
           }
      }
    setCart([...cart, JSON.stringify(cartItem)]);
    console.log("cart : " + cart);
    try{
       await axios.post("localhost:5000/Cart/addCart",).then((result)=>{
        console.log(result)
       }).catch((error)=>{
        console.log("Error !!! " + error)
       })
    }catch(e){
      console.log(e)
    }
  };

  return (
    <div>
    <h1>Home</h1>
    
    <ul className='Container-inventory'>
      {inventory.map((item, index) => (
        item.archived ? (
          <>
            <li className='product' key={index}>
              <img src={item.Image} alt="product" className="ItemImg" />
              <p><b>Product name :</b>{item.name}</p>
              <p><b>Product description :</b>{item.descr}</p>
              <p><b>Product type :</b>{item.type}</p>
              <p><b>Product sub type :</b>{item.sub_type}</p>
              <p><b>Product retail Price :</b>{item.retailPrice}</p>
              <p><b>Product wholesalePrice :</b>{item.wholesalePrice}</p>
              <p>manufacture date :{item.createdAt}</p>
              <p>expire date :{item.updatedAt}</p> 

              <div className='p-buttons'>
              <button className='btn-addTocart' onClick={() => AddItemToCart(item)}>Add to Cart</button>
              <button className='btn-addTowishlist'>Add to Wishlist</button>
              </div>
            </li>
          </>
        ):null
      ))}
    </ul>
  </div>
  );
}

export default Home;