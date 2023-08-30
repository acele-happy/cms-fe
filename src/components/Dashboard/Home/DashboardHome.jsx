import React from "react";
import "./HomeDashboard.scss";
import { Link } from "react-router-dom";
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

import Footer from "../../Footer/Footer";

const DashboardHome = () => {
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
        <Link to="/createaccount">
          <AiOutlineTeam /> Manage Accounts
        </Link>
        <Link to="" className="logout">
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
              <p>
                Samuel Ndatimana<span>Academic</span>
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
              67
              <br />
              <span>Pending Request</span>
            </p>
            <p>
              <AiFillAlert />{" "}
            </p>
          </div>
        </div>
        <div class="col-div-3">
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
