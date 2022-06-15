import { useContext } from 'react';

import { CartContext } from '../../context/CartContext';
import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem})=>{
  const {name,price,imageUrl,quantity} = cartItem;
  const {addItemToCart,removeItemFromCart,clearItemFromCart} = useContext(CartContext);
  const addCartItem = ()=>{addItemToCart(cartItem)}
  const removeCartItem = ()=>{removeItemFromCart(cartItem)}
  const clearCartItem = ()=>{clearItemFromCart(cartItem)}
  return(
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`}/>
      </div>
      <div className="name">{name}</div>
      <span className="quantity">
      <div className="arrow">
        <span onClick={removeCartItem}>&#10094;</span>
        </div>
      <span className="value">{quantity}</span>
      <div className="arrow">
        <span onClick={addCartItem}>&#10095;</span></div>
      </span>
      <div className="price">{price}</div>
      <div className="remove-button">
        <span onClick={clearCartItem}>&#10005;</span>
        </div>

    </div>
  );
}

export default CheckoutItem;