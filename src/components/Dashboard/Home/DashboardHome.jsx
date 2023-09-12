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
import {useNavigate} from "react-router-dom"

const DashboardHome = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [display, setDisplay] = useState("block");
  const [top, setTop] = useState("0");
  const [pending, setPending] = useState("");
  const [numberOfUsers, setNumberOfUsers] = useState("")
  const [click,setCLick] = useState(false)
  const [displayTextArea,setDisplayTextArea] = useState('none')
  const [message, setMessage] = useState("")
  const [userId,setUserId] = useState("")
  const [displayClaim, setDisplayClaim] = useState("none")
  const [success,setSuccess] = useState("")

  const handleMessageClick = (e)=>{
    setMessage(e.target.value)
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    if (decoded.role != "ACADEMICS") {
      setDisplay("none");
      setTop("500px");
    }

    if(decoded.role === "LECTURER"){
      setDisplayClaim("block")
    }
    setName(decoded.name);
    setRole(decoded.role);
    setUserId(decoded.id)

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
    navigate("/")
    window.location.reload()
  };

  const handleClaimClick = ()=>{
    setCLick(!click)
    if(click){
      setDisplayTextArea("block")
      return
    }
    setDisplayTextArea('none')
  }

  const onClaim = ()=>{
    axios.post(`http://localhost:4040/user/claimSalary/:${userId}`,{message:message})
    .then(res=>{
      setSuccess(res.data)
      setMessage("")
      setTimeout(()=>{
        setSuccess("")
      },5000)
    })
    .catch(err=>{
      console.log(err)
    })
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
        <Link to="/createaccount" style={{ display: `${display}` }}>
          <AiOutlineTeam /> Manage Accounts
        </Link>
        <Link
          to=""
          className="logout"
          onClick={logout}
        >
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
              <img src={profile} alt="profiel" className="pro-img" style={{position:"relative",right:"30px"}} />
              <p style={{ position: "relative", right: "35px" }}>
                <span style={{color:"#1E4FFD"}}>{name}</span>
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

        <div className="col-div-3" style={{cursor:'pointer',display:`${displayClaim}`}} onClick={handleClaimClick}>
          <div className="box">
            <p>
              <span style={{color:"#fff"}}>Claim Your Salary</span>
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
        <p style={{color:"green"}}>{success}</p>
            <div style={{position:"relative",top:"130px",right:"220px", display:`${displayTextArea}`}}>
        <textarea placeholder="Write a custom message to CP" style={{width:"300px",height: '100px',outline:'none',textIndent:'5px', borderRadius:'5px',border:'1px solid #111'}} name="message" value={message} onChange={handleMessageClick}></textarea>

        <button type="button" style={{top:'30px',position:"relative", border:"none",width:"100px",padding:"10px",borderRadius:'5px', background:'#1E4FFD', color:"#fff", right: "300px",cursor:'pointer'}} onClick={onClaim}>Claim</button>
        </div>

        <div className="footer-container">
          <p>&copy; 2023 CMS</p>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
