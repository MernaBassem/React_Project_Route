import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg'
import { CounterContext } from '../../Context/Counter';
import { TokenContext } from '../../Context/Token';
import { CartContext } from '../../Context/cartContent';

export default function Navbar() {
  let { numOfCartItems} = useContext(CartContext);

  let {counter}= useContext(CounterContext)
  let {token,setToken}=useContext(TokenContext)
  let navigate = useNavigate()
  function logOut(){
    localStorage.removeItem('userToken')
    setToken(null)
    navigate('/login')
  }



  return <>
  <header>
  <nav className="navbar navbar-expand-lg bg-body-tertiary  mb-5">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {token?
           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           <li className="nav-item">
             <Link className="nav-link" to="/">Home</Link>
           </li>
           <li className="nav-item">
             <Link className="nav-link" to="/products">Products</Link>
           </li>
          
           <li className="nav-item">
             <Link className="nav-link" to="/categories">Categories</Link>
           </li>
           <li className="nav-item">
             <Link className="nav-link" to="/brands">Brands</Link>
           </li>
           <li className="nav-item">
             <Link className="nav-link" to="/wishList">WishList</Link>
           </li>
         </ul>
           :null}
          
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li>
           
            {token?<>
              <li className="nav-item">
               <button className="nav-link" onClick={logOut}>Logout</button>
             </li>
              <li className="nav-item ">
             <Link className="nav-link" to="/cart">

              <i className='fa fa-shopping-cart text-main fs-3'></i>
              <span className=' text-main fs-4 p-1'>{ numOfCartItems}</span>
             </Link>
           </li>
            </>
             
            :<>
              <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link" to="/register">Register</Link>
             </li>
            </>   
          }

          </ul>

        </div>
      </div>
    </nav>
  </header>
 
  </>
}
