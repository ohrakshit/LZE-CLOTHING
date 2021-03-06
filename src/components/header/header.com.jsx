import React from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase.utils';

import {createStructuredSelector} from 'reselect'
//-----------------Redux------------------//
import {connect } from 'react-redux'
//----------------------------------------

import './header.sty.scss';
import { ReactComponent as Logo} from '../../assests/crown.svg'
import CartIcon from '../cart-icon/cart-icon.com'
import CartDropdown from '../cart-dropdown/cart-dropdown.com';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
 

const Header = ({currentUser,hidden}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop' >SHOP</Link>
            <Link className='option' to='/shop' >CONTACT</Link>
            {
                currentUser ? 
                <div className='option' onClick={()=>auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signin' >
                    SIGN IN
                </Link>
            }
            <CartIcon />
        </div>
        {
            hidden ? null: <CartDropdown/>  
        }
        
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);