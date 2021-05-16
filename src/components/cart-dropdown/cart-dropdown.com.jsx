import React from 'react';
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom'
import { selectCartItems } from '../../redux/cart/cart.selectors';
import {toggleCartHidden} from '../../redux/cart/cart.actions'
import CartItem from '../cart-item/cart-item.com';

import CustomButton from '../custom-button/custom-button.com';
 
import './cart-dropdown.sty.scss';

const CartDropdown = ({cartItems,history, dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ? cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} /> )
                : <span className='cart-empty'>Your cart is Empty!</span>
            }
        </div>
            <CustomButton onClick={()=>{history.push('/checkout')
        dispatch(toggleCartHidden())
        }} >GO TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

 
export default withRouter(connect(mapStateToProps)(CartDropdown));