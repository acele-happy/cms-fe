import React from "react";
import "./ViewRequestPage.scss";
import HomeDashboard from "../Home/HomeDashboard.scss?inline";
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
const ViewRequest = () => {
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
        <Link to="">
          <AiOutlineLogout /> Logout{" "}
        </Link>
      </div>

      <div className="main">
        <div class="head">
          <div class="col-div-6">
            <span className="nav">
              {" "}
              <AiOutlinePullRequest /> Manage Pending Request
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

        <div className="myviewtbale">
          <table>
            <tr>
              <th>No</th>
              <th>Names</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Status</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mukamarara Divine</td>
                <td>mukamaradivine23@gmail.com</td>
                <td>0789990784</td>
                <td>advanced web design</td>
                <td>not approved</td>
                <td>
                  <button className="updatebtn">update</button>
                </td>
                <td>22-09-2023</td>
              </tr>

              <tr>
                <td>2</td>
                <td>Mukamarara Divine</td>
                <td>mukamaradivine23@gmail.com</td>
                <td>0789990784</td>
                <td>advanced web design</td>
                <td>not approved</td>
                <td>
                  <button className="updatebtn">update</button>
                </td>
                <td>22-09-2023</td>
              </tr>

              <tr>
                <td>3</td>
                <td>Mukamarara Divine</td>
                <td>mukamaradivine23@gmail.com</td>
                <td>0789990784</td>
                <td>advanced web design</td>
                <td>not approved</td>
                <td>
                  <button className="updatebtn">update</button>
                </td>
                <td>22-09-2023</td>
              </tr>

              <tr>
                <td>4</td>
                <td>Mukamarara Divine</td>
                <td>mukamaradivine23@gmail.com</td>
                <td>0789990784</td>
                <td>advanced web design</td>
                <td>not approved</td>
                <td>
                  <button className="updatebtn">update</button>
                </td>
                <td>22-09-2023</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Mukamarara Divine</td>
                <td>mukamaradivine23@gmail.com</td>
                <td>0789990784</td>
                <td>advanced web design</td>
                <td>not approved</td>
                <td>
                  <button className="updatebtn">update</button>
                </td>
                <td>22-09-2023</td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <button className="pagination-btn">Previous</button>
            <button className="pagination-btn">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn active">3</button>
            <button className="pagination-btn">4</button>
            <button className="pagination-btn">Next</button>
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

export default ViewRequest;
