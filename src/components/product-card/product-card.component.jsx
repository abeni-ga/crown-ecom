import { useContext } from "react";

import { CartContext } from "../../context/CartContext";

import Button from "../button/button.component";

import './product-card.styles.scss';

const ProductCard = ({product})=>{
  const {addItemToCart} = useContext(CartContext);
  const addProductToCart = ()=>{
    addItemToCart(product);
  }
  const {name,price,imageUrl} = product;
  return(
    <div className="product-card-container">
      <img src={imageUrl} alt={name}/>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType='inverted' onClick={addProductToCart}>Add To Cart</Button>
    </div>
  );
}

export default ProductCard;