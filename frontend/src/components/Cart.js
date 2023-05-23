import React from 'react'
import { useState } from 'react'
import './cartStyle.css'
import axios from 'axios'
import { useEffect } from 'react'
import generatePDF from './payment_report'

function Cart() {

  const [data , setData] = useState([])
  const [subTotal,setSubTotal] = useState(0)
  const [deliveryCharges,setDeliveryCharges] = useState(0)
  const [total,setTotal] = useState(0)
  const [qty , setQty] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:5000/cart/getAllCart')
    .then(res => {
      console.log(res.data)
      setData(res.data)

    

      let subTotal = 0
      let deliveryCharges = 0
      let total = 0

      res.data.map(item => {
        if(item.quantity > 8){
          subTotal += (item.wholesalePrice * item.quantity)
        }else{
          subTotal += (item.retailPrice * item.quantity)
        }
      }
      )

      if(subTotal >= 10000){
        deliveryCharges = 150
      }else{
        deliveryCharges = 200
      }

      total = subTotal + deliveryCharges

      setSubTotal(subTotal)
      setDeliveryCharges(deliveryCharges)
      setTotal(total)

      
    })
    .catch(err => {
      console.log(err)
    }) 
  },[data])


  const addQty = (item) => {
    axios.put(`http://localhost:5000/cart/editCart/${item._id}` , {quantity:item.quantity + 1})
    .then(res => {
      console.log(res.data)
      setQty(item.quantity+1) 
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  const minusQty = (item) => {
    if(item.quantity <= 1){

    }else{
      axios.put(`http://localhost:5000/cart/editCart/${item._id}` , {quantity:item.quantity - 1})
    .then(res => {
      console.log(res.data)
      setQty(item.quantity-1) 
    })
    .catch(err => {
      console.log(err)
    })
    }
  }

 

  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/cart/deleteCart/${id}`)
    .then(res => {
      console.log(res.data)
      setData(data.filter(item => item._id !== id))
      alert("Item deleted")
    })
    .catch(err => {
      console.log(err)
    })
  }


  return (
    <div>
    <h1>Shopping Cart</h1>
      <div className="WholeCartPage">

          <div className="Cart-Container">
              <h2>Your Orders</h2>
               
                  {data.map((item,index) => (
                    <div key={index} className="WholeItem">
                        <div  className="Item">
                              <img src={item.image} alt="product" className="ItemImg" />
                              <div className="ItemDetails"> 
                                <p className="p-tag">{item.productName} </p>
                                <p className='description'>Description : 
                                <br/>
                                 {item.description}</p>
                                <p className='price'>Retail Price : Rs.{item.retailPrice}</p>
                                <p className='price'>Wholesale Price : Rs.{item.wholesalePrice}</p>
                              </div>
                              <div className="ItemQty">
                                <button className="qtyEditBtn" onClick={() => addQty(item)}>+</button>
                                <p className='qty-tag'>{item.quantity}</p>
                                <button className="qtyEditBtn" onClick ={() => minusQty(item)}>-</button>
                              
                              </div>

                              <div className="option-wrapper">
                                  <div className="ItemBtn">
                              <button className="deletebtn" onClick={()=> deleteItem(item._id)}>Delete</button>
                    
                                  </div>
                             </div>
                        </div> 
                        
                    </div>
                  ))} 
       
        </div>

        <div className="Checkout">
            <div>
                <h2>Summery</h2>
                      <table>
                          <tr> 
                                <td>Subtotal </td>
                                <td>:  Rs.{subTotal}</td>
                          </tr>
                          <tr>
                                <td>Delivery Charges  </td>
                                <td>:  Rs.{deliveryCharges}</td> 
                          </tr>
                          <tr>
                                <td>Total  </td>
                                <td>:  Rs.{total}</td>
                          </tr>
                              
                          </table>
                      <center><button className="checkBtn">CheckOut</button></center>
                      <center><button className="billBtn" onClick={()=>generatePDF(data,subTotal,deliveryCharges,total)}>Download bill</button></center>
            </div>  
        </div>
      </div>
</div>
  )
}

export default Cart