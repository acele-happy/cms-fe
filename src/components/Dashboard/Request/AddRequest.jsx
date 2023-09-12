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

const logout = () => {
  localStorage.clear();
  const navigate = useNavigate();
  navigate("/");
  window.location.reload();
};
const AddRequest = () => {
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
        <Link to="">
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
                <span style={{ color: "#1E4FFD" }}>Academics Names</span>
                <span>academics</span>
              </p>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="container-form">
          <h2>Fill Form To Send Request</h2>

          <form className="form-details">
            <div style={{ position: "relative", top: "10px", right: "-150px" }}>
              <input
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
              />
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
              ></textarea>
            </div>

            <button type="button" className="sb-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRequest;
