import { createContext,useReducer} from "react";

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

export const CART_ACTION_TYPE = {
  SET_IS_CART_OPEN:'SET_IS_CART_OPEN',
  SET_CART_ITEMS:'SET_CART_ITEMS'
}


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

  const cartReducer=(state,action)=>{
    const {type,payload} = action;
    switch(type){
      case CART_ACTION_TYPE.SET_CART_ITEMS:
        return{
          ...state,
          ...payload
        }
      case CART_ACTION_TYPE.SET_IS_CART_OPEN:
        return{
          ...state,
          isCartOpen:payload
        }
      default:
        throw new Error(`unhandled type ${Error} in cart reducer`);
    }
  }

  const INITIAL_STATE = {
    isCartOpen:false,
    cartItems:[],
    cartCount:0,
    cartTotal:0
  }
  const setIsCartOpen = (bool)=>{
    dispatch({type:CART_ACTION_TYPE.SET_IS_CART_OPEN,payload:bool})
  }
  const [{isCartOpen,cartItems,cartCount,cartTotal},dispatch] = useReducer(cartReducer,INITIAL_STATE);
  const updateCartItemReducer = (newCartItems)=>{
    const itemCount =  newCartItems.reduce((total,cartItem)=>
    total + cartItem.quantity
  ,0)

  const total = newCartItems.reduce((total,cartItem)=>
    total + cartItem.quantity* cartItem.price,0)

    dispatch({
      type:CART_ACTION_TYPE.SET_CART_ITEMS,
      payload:{
        cartItems:newCartItems,
        cartCount:itemCount,
        cartTotal:total
      }
    })
  }
  const addItemToCart = (productToAdd)=>{
    const newCartItems=addCartItem(cartItems,productToAdd)
    updateCartItemReducer(newCartItems);
  }
  const removeItemFromCart = (productToRemove)=>{
    const newCartItems=removeCartItem(cartItems,productToRemove);
    updateCartItemReducer(newCartItems);
  }
  const clearItemFromCart = (productToClear)=>{
    const newCartItems=clearCartItem(cartItems,productToClear);
    updateCartItemReducer(newCartItems);
  }
  const value = { 
    isCartOpen, 
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    cartTotal,
    clearItemFromCart 
  };

  return(
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}