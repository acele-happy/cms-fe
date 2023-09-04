import React, { useEffect, useState } from "react";
import "./HomeDashboard.scss";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import {
  AiFillDashboard,
  AiFillFolderOpen,
  AiOutlinePullRequest,
  AiOutlineTeam,
  AiOutlineMenu,
  AiOutlineLogout,
  AiFillAlert,
} from "react-icons/ai";
import profile from "../../../images/profile.png";
import axios from "axios";

const DashboardHome = () => {

  const [name,setName] = useState("")
  const [role,setRole] = useState("")
  const [display,setDisplay] = useState("block")
  const [top, setTop] = useState("0")
  const [pending,setPending] = useState("")

  useEffect(()=>{

    const token = localStorage.getItem('token')
    console.log(jwtDecode(token))
    const decoded = jwtDecode(token)
    if(decoded.role != "ACADEMICS"){
      setDisplay("none")
      setTop("500px")
    }
    setName(decoded.name)
    setRole(decoded.role)

    axios.get(`http://localhost:4040/user/pendingNotifications/:${decoded.id}`)
    .then((res)=>{
      setPending(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  const logout = ()=>{
     localStorage.clear()
     location.reload()
  }
  return (
    <>
      <div id="mySidenav" className="sidenav">
        <p className="dashlogo">
          <span>C</span>-MS
        </p>

        <Link to="/dashboardHome">
          <AiFillDashboard /> Dashboard
        </Link>
        <Link to="/showRequest">
          <AiOutlinePullRequest /> Manage Requests
        </Link>
        <Link to="">
          <AiFillFolderOpen /> Manage Reports
        </Link>
        <Link to="/createaccount" style={{display:`${display}`}}>
          <AiOutlineTeam /> Manage Accounts
        </Link>
        <Link to="" className="logout" onClick={logout} style={{position:'absolute', top:`${top}`}}>
          <AiOutlineLogout /> Logout
        </Link>
      </div>

      <div className="main">
        <div class="head">
          <div class="col-div-6">
            <span className="nav">
              {" "}
              <AiOutlineMenu /> Dashboard
            </span>
          </div>

          <div className="col-div-6">
            <div className="profile">
              <img src={profile} alt="profiel" className="pro-img" />
              <p style={{position:"relative", right: "25px"}}>
                {name}<span>{role}</span>
              </p>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>

        <div class="clearfix"></div>
        <br />

        <div class="col-div-3">
          <div class="box">
            <p>
              {pending}
              <br />
              <span>Pending Request</span>
            </p>
            <p>
              <AiFillAlert />{" "}
            </p>
          </div>
        </div>
        <div class="col-div-3" style={{display:`${display}`}}>
          <div class="box">
            <p>
              88
              <br />
              <span>Accounts</span>
            </p>
            <p>
              {" "}
              <AiOutlineTeam />
            </p>
          </div>
        </div>

        <div class="clearfix"></div>
        <br />
        <br />

		<div className="footer-container">
        <p>&copy; 2023 CMS</p>
      	</div>
      </div>

      
    </>
  );
};

export default DashboardHome;
