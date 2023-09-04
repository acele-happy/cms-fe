import React,{useEffect,useState} from "react";
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
} from "react-icons/ai";
import profile from "../../../images/profile.png";
import jwtDecode from "jwt-decode";

const ViewRequest = () => {
  const [name,setName] = useState("")
  const [role,setRole] = useState("")
  const [display,setDisplay] = useState("block")
  const [top, setTop] = useState("0")

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
        <Link to="/createaccount" style={{display: `${display}`}}>
          <AiOutlineTeam /> Manage Accounts
        </Link>
        <Link to="" className="logout" onClick={logout} style={{position:"absolute",top:`${top}`}}>
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
              <p style={{position:"relative", right: "25px"}}>
                {name}<span>{role}</span>
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
