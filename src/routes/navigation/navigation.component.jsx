import { useContext } from "react";
import { Outlet,NavLink } from "react-router-dom";
import { Fragment } from "react";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { UserContext } from "../../context/userContext";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../context/CartContext";


import CartIcon from "../../components/cart-icon/cart-icon.component";

import './navigation.styles.scss';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";



const Navigation = ()=>{
  const {currentUser,setCurrentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

  const signOutHandler = async()=>{
      await signOutUser();
      setCurrentUser(null);
      
    }
  return(
    <Fragment>
      <div className="navigation">
        <div className="logo-container">
          <NavLink to='/'>
          <CrwnLogo/>
          </NavLink>
        </div>
        <div className="nav-links-container">
          <NavLink className='nav-link' to='shop'>
            SHOP
          </NavLink>
          {
          currentUser?
          (<span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>):
          <NavLink className='nav-link' to='auth'>
            SIGN IN
          </NavLink>}
          <CartIcon/>
        </div>
      {isCartOpen && <CartDropdown/>}
      </div>
      <Outlet/>
    </Fragment>
  )
}

export default Navigation;