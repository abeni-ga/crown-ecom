import { useEffect } from "react";
import { createContext,useState } from "react";

export const CartContext = createContext({
  isCartOpen:false,
  setIsCartOpen:()=>{},
  cartItems:[],
  addItemToCart:()=>{},
  removeItemFromCart:()=>{},
  clearItemFromCart:()=>{},
  cartCount:0,
  cartTotal:0
});

const addCartItem=(cartItems,productToAdd)=>{
  
  const existingCartItem = cartItems.find((cartItem)=>cartItem.id===productToAdd.id);
  if(existingCartItem){
    return cartItems.map((cartItem)=>cartItem.id===productToAdd.id?
    {...cartItem,quantity:cartItem.quantity+1}:
    cartItem
    )
  }


  return [...cartItems,{...productToAdd,quantity:1}]
}
const removeCartItem=(cartItems,productToRemove)=>{
  const existingCartItem = cartItems.find((cartItem)=>cartItem.id===productToRemove.id);
  if(existingCartItem.quantity!==1){
    return cartItems.map((cartItem)=>cartItem.id===productToRemove.id?
    {...cartItem,quantity:cartItem.quantity-1}:
    cartItem
    )
  }
  return cartItems.filter((cartItem)=>cartItem.id!==productToRemove.id);
}
const clearCartItem=(cartItems,productToClear)=>{
  return cartItems.filter((cartItem)=>cartItem.id!==productToClear.id);

}

export const CartProvider = ({children})=>{

  const [isCartOpen,setIsCartOpen] = useState(false);
  const [cartItems,setCartItems] =useState([]);
  const [cartCount,setCartCount] = useState(0);
  const [cartTotal,setCartTotal] = useState(0);


  useEffect(()=>{
    const itemCount =  cartItems.reduce((total,cartItem)=>
    total + cartItem.quantity
  ,0)
    setCartCount(itemCount);
    
  },[cartItems])
  useEffect(()=>{
    const total = cartItems.reduce((total,cartItem)=>
    total + cartItem.quantity* cartItem.price,0)
    setCartTotal(total)
  },[cartItems])
  const addItemToCart = (productToAdd)=>{
    setCartItems(addCartItem(cartItems,productToAdd))
  }
  const removeItemFromCart = (productToRemove)=>{
    setCartItems(removeCartItem(cartItems,productToRemove))
  }
  const clearItemFromCart = (productToClear)=>{
    setCartItems(clearCartItem(cartItems,productToClear))
  }
  const value = { isCartOpen, setIsCartOpen,cartItems,addItemToCart,cartCount,removeItemFromCart,cartTotal,clearItemFromCart };

  return(
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}