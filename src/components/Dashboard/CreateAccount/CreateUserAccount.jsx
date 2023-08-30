import React from "react";
import "./CreateUserAccountPage.scss"; 
import HomeDashboard from "../Home/HomeDashboard.scss?inline";
import { Link } from "react-router-dom";
import {AiFillDashboard,AiFillFolderOpen,
  AiOutlinePullRequest,AiOutlineTeam,AiOutlineMenu,AiOutlineLogout,AiFillAlert} from "react-icons/ai";
import profile from '../../../images/profile.png'; 

import Footer from "../../Footer/Footer";

const CreateUserAccount =()=>{
    return (

        <>
        
        <div id="mySidenav" className="sidenav">
    <p className="dashlogo"><span>C</span>-MS</p>

    <Link to="/dashboardHome"><AiFillDashboard /> Dashboard</Link>
    <Link to="/showRequest"><AiOutlinePullRequest /> Manage Requests</Link>
    <Link to=""><AiFillFolderOpen /> Manage Reports</Link>
    <Link to="/createaccount"><AiOutlineTeam /> Manage Accounts</Link>
    <Link to="" className="logout"><AiOutlineLogout /> Logout </Link>
    
    
    </div>

    <div className="main">
       
    <div class="head">
			<div class="col-div-6">
	<span  className="nav"  > <AiOutlinePullRequest /> Manage Account</span>
	
	</div>
		
		<div className="col-div-6">
		<div className="profile">

      <img src={profile} alt="profiel" className="pro-img"/>
			<p>Samuel Ndatimana <span>Academic</span></p>
		</div>
	</div>
		<div className="clearfix"></div>
	 </div>

   

      <div  className="container-form">
      <h2>Add New Part Timer</h2>  
	    <form className="form-details">
        <input type="text" placeholder="Names" className="inputbox"  required/>
        <input type="email" placeholder="Email"  className="inputbox" required/>
        <input type="text" placeholder="Phone"  className="inputbox" required/>
        <input type="text" placeholder="Course"  className="inputbox" required/>
        <input type="text" placeholder="Password"  className="inputbox" required />
        <button type="submit" className="sb-btn">Submit</button>
        </form>
        </div>
		<div class="clearfix"></div>
		<br/><br/>
   


      </div>
	  
    <Footer />
        </>
       
    )
}

export default CreateUserAccount;