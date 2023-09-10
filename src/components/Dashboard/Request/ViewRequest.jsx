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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewRequest = () => {
  const [name,setName] = useState("")
  const [role,setRole] = useState("")
  const [display,setDisplay] = useState("block")
  const [top, setTop] = useState("0")
  const [data,setData] = useState([])
  const [approve,setApprove] = useState("block")
  const [loading,setLoading] = useState(true)

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

    axios.get(`http://localhost:4040/user/manageRequests/:${decoded.id}`)
    .then(res=>{
      setData(res.data)
      setLoading(false)
    })
    .catch(err=>{ 
      console.log(err)
      setLoading(false)
    })
  },[])
  const logout = ()=>{
     localStorage.clear() 
     const navigate = useNavigate()
     navigate("/")
     window.location.reload()
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
        <Link to="" className="logout">
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
              <th>Telephone</th>
              <th>Message</th>
              <th style={{display:`${display}`}}>Action</th>
              <th>Approve</th>
            </tr>
            {loading? (<p style={{fontWeight: "bold"}}>Loading...</p>):(
            <tbody>
              { data.map((user,index)=>(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{user.names}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.message}</td>
                <td style={{display:`${display}`}}>
                  <button className="updatebtn">update</button>
                </td>
                <td><button style={{backgroundColor:"green",border: 'none', padding:"5px",borderRadius: "3px",color: "#fff",cursor: "pointer"}}>Approve</button></td>
              </tr>
          ))}
            </tbody>
                      )}
          </table>

          <div class="pagination">
            <button className="pagination-btn">Previous</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
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
