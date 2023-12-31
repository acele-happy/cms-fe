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
  AiOutlineFolderView,
  AiFillFolderAdd,
} from "react-icons/ai";
import profile from "../../../images/profile.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.jpg";

const DashboardHome = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [display, setDisplay] = useState("block");
  const [top, setTop] = useState("0");
  const [pending, setPending] = useState("");
  const [numberOfUsers, setNumberOfUsers] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    if (decoded.role != "ACADEMICS") {
      setDisplay("none");
      setTop("500px");
    }

    setName(decoded.name);
    setRole(decoded.role);

    axios
      .get(`http://localhost:4040/user/pendingNotifications/:${decoded.id}`)
      .then((res) => {
        setPending(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:4040/user/countUsers`)
      .then((res) => {
        setNumberOfUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const logout = () => {
    localStorage.clear();
    const navigate = useNavigate();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div id="mySidenav" className="sidenav">
      <div
          style={{
            width: "100px",
            height: "100px",
            position: "relative",
            left: "100px",
            bottom: "20px",
            boxShadow: "5px 5px 10px rgba(30, 79, 253,0.5)",
            marginBottom: "20px",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "100px", height: "100px", borderRadius: "5px" }}
          />
          <figcaption
            style={{
              fontSize: "20px",
              color: "#1E4FFD",
              width: "200px",
              fontWeight: "bold",
            }}
          >
            ISTM-Goma
          </figcaption>
        </div>
        <Link to="/dashboardHome">
          <AiFillDashboard /> Dashboard
        </Link>

        {role !== "ACADEMICS" &&
          role !== "HOD" &&
          role !== "CP" &&
          role !== "FINANCE" && (
            <Link to="/addRequest">
              <AiFillFolderAdd /> Add Requests
            </Link>
          )}

        <Link to="/showRequest">
          <AiOutlinePullRequest /> View Requests
        </Link>

        <Link to="/createaccount" style={{ display: `${display}` }}>
          <AiOutlineTeam /> Add Users
        </Link>

        <Link to="/viewusers" style={{ display: `${display}` }}>
          <AiOutlineTeam /> View Users
        </Link>
        <Link to="/notficationreport" style={{ display: `${display}` }}>
          <AiFillFolderOpen /> Manage Reports
        </Link>
        <Link to="" className="logout" onClick={logout}>
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

        <div className="clearfix"></div>
        <br />

        <div className="col-div-3">
          <div className="box">
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

        <div className="col-div-3" style={{ display: `${display}` }}>
          <div className="box">
            <p>
              {numberOfUsers}
              <br />
              <span>Accounts</span>
            </p>
            <p>
              {" "}
              <AiOutlineTeam />
            </p>
          </div>
        </div>

        <div className="footer-container">
          <p>&copy; 2023 CMS</p>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
