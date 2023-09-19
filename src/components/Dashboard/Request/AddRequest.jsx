import React, { useEffect, useState } from "react";
import "./ViewRequestPage.scss";
import { Link } from "react-router-dom";
import {
  AiFillDashboard,
  AiFillFolderOpen,
  AiOutlinePullRequest,
  AiOutlineTeam,
  AiOutlineMenu,
  AiOutlineLogout,
  AiFillAlert,
  AiFillFolderAdd,
} from "react-icons/ai";
import profile from "../../../images/profile.png";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

const AddRequest = () => {

  const [name,setName] = useState("")
  const [role,setRole] = useState("")
  const [message, setMessage] = useState("")
  const [userId,setUserId] = useState("")
  const [success,setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(()=>{
    const token = localStorage.getItem("token");
    console.log(jwtDecode(token));
    const decoded = jwtDecode(token);
    setName(decoded.name);
    setRole(decoded.role);
    setUserId(decoded.id)
  })

  const logout = () => {
    localStorage.clear();
    const navigate = useNavigate();
    navigate("/");
    window.location.reload();
  };


  const onClaim = ()=>{
    console.log('hehe')
    axios.post(`http://localhost:4040/user/claimSalary/:${userId}`,{message:message})
    .then(res=>{
      setSuccess(res.data)
      setMessage("")
      setTimeout(()=>{
        setSuccess("")
      },5000)
    })
    .catch(err=>{
      // alert(err.response.data)
      setError(err.response.data)
    })
  }

  const handleMessageClick = (e)=>{
    setMessage(e.target.value)
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

        <Link to="/addRequest">
          <AiFillFolderAdd /> Add Requests
        </Link>

        <Link to="/showRequest">
          <AiOutlinePullRequest /> View Requests
        </Link>
        <Link to="/managereports">
          <AiFillFolderOpen /> Manage Reports
        </Link>

        <Link to="" className="logout" onClick={logout}>
          <AiOutlineLogout /> Logout
        </Link>
      </div>

      <div className="main">
        <div className="head">
          <div className="col-div-6">
            <span className="nav">
              {" "}
              <AiOutlinePullRequest /> Manage Account
            </span>
          </div>

          <div className="col-div-6">
            <div className="profile">
              <img
                src={profile}
                alt="profiel"
                className="pro-img"
                style={{ position: "relative", right: "30px" }}
              />
              <p style={{ position: "relative", right: "35px" }}>
                <span style={{ color: "#1E4FFD" }}>{name}</span>
                <span>{role}</span>
              </p>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="container-form">
          <h2>Fill Form To Send Request</h2>
          <p style={{color:'green',textAlign:'center'}}>{success}</p>
          <p style={{color:'red'}}>{error}</p>
          <form className="form-details">
            <div style={{ position: "relative", top: "10px", right: "-150px" }}>
              {/* <input
                type="text"
                placeholder="CP Name"
                className="inputboxes"
                required
                name="cpnames"
              />
              <input
                type="date"
                placeholder="Start Date"
                className="inputboxes"
                required
                name="starteddate"
              />

              <input
                type="date"
                placeholder="End Date"
                className="inputboxes"
                required
                name="endeddate"
              /> */}
              <textarea
                placeholder="Write a custom message to CP"
                style={{
                  marginTop: "10px",
                  width: "350px",
                  height: "100px",
                  outline: "none",
                  textIndent: "5px",
                  borderRadius: "5px",
                  border: "1px solid #111",
                }}
                name="message"
                className="textarearequest"
                value={message}
                onChange={handleMessageClick}
              ></textarea>
            </div>

            <button type="button" className="sb-btn" onClick={onClaim}>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRequest;
