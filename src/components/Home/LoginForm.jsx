import React from 'react';
import './Homepage.scss';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

const LoginForm = () => {
  return (
    <>
      <div className='navbar-container'>
        
      
        <Link to='#' className='logo'>C<span className='logocolor'>M</span>S</Link>
         
       
        <ul className='nav-links'>
          <li className='nav-item'><Link to="#">Home</Link></li>
          <li className='nav-item'><Link to="#">About</Link></li>
          <li className='nav-item'><Link to="#">Get Started</Link></li>
        </ul>
       

       </div>

       <div className='form-container'>
        
        <div className='formcontent'>
       <h2>Sign In</h2> 
       
          <form>

          
           <input className='inputBox' type='text' placeholder='Your email...'required/>
        
           <input className='inputBox' type='password' placeholder='Your password...' required/>
         

          <Link to="/dashboardHome" ><button className='btnsubmit'>Login</button></Link> 
          </form>
          </div>
       
       </div>
      
   <Footer />
   
    </>
  );
};

export default LoginForm;
