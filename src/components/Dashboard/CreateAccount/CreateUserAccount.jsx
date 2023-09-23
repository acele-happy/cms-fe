import React, { useEffect,useState } from "react";
import "./CreateUserAccountPage.scss";
import { Link } from "react-router-dom";
import {
  AiFillDashboard,
  AiFillFolderOpen,
  AiOutlinePullRequest,
  AiOutlineTeam,
  AiOutlineMenu,
  AiOutlineLogout,
  AiFillAlert,
  AiFillFolderAdd
} from "react-icons/ai";
import profile from "../../../images/profile.png";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.jpg'

const CreateUserAccount = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [displayDepartment, setDisplayDepartment] = useState("none");
  const [displaySalary, setDisplaySalary] = useState("none");
  const [displayCourse, setDisplayCourse] = useState("none");
  const [errors, setErrors] = useState("")
  const [created, setCreated] = useState("")

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    department: "",
    salary: "",
    course:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'role' && value=== 'LECTURER') {
      setDisplaySalary("block")
      setDisplayDepartment("block")
      setDisplayCourse("block")
    }
    if(name === 'role' &&value==="FINANCE"){
      if(displaySalary === "block"){
        setDisplaySalary("none")
        setDisplayCourse("none")
        setDisplayDepartment("none")
        return
      }
    }

    if(name==='role' && value=="CP"){
      setDisplayCourse('block')
      setDisplayDepartment('block')
      if(displaySalary==='block'){
        setDisplaySalary('none')
      }
    }

    if(name==='role' && value=="HOD"){
      setDisplayDepartment('block')
      if(displaySalary==='block'){
        setDisplaySalary('none')
      }
      if(displayCourse === "block"){
        setDisplayCourse('none')
      }
    }

    if(name==='role' && (value === "ACADEMICS" || value === "FINANCE")){
      setDisplayDepartment("none")
      setDisplaySalary("none")
      setDisplayCourse("none")
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    setName(decoded.name);
    setRole(decoded.role);
  }, []);
  const logout = () => {
    localStorage.clear();
    const navigate = useNavigate();
    navigate("/")
    window.location.reload()
  };

  const handleSubmit=()=>{
    if(formData.email == '' || formData.password == '' || formData.fullName=='' || formData.role==''){
      setErrors("Please provide all required fields!")
      return
    }
    if(formData.phoneNumber.length> 10 || formData.phoneNumber.length <10){
      setErrors("Phone Number must be 10 numbers!")
      return
    }
    console.log('hee')
    axios.post("http://localhost:4040/user/register",formData)
    .then(res=>{
      setErrors("")
      setCreated("Created!")
      setTimeout(()=>{
        setCreated("")
      },5000)
    })
    .catch(err=>{
      console.log(err)
      if(err.response.data.code == 11000){
        setErrors("Email Already exists!")
      }
    })
  }

  const clear = ()=>{
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
      department: "",
      salary: "",
      course:""
    })
  }
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
        {role !== "ACADEMICS" && role !== "HOD" && role !== "CP" && role !== "FINANCE" && (
          <Link to="/addRequest">
            <AiFillFolderAdd /> Add Requests
          </Link>
        )}

        <Link to="/showRequest">
          <AiOutlinePullRequest /> View Requests
        </Link>
       
        <Link to="/createaccount">
          <AiOutlineTeam /> Add Users
        </Link>
        <Link to="/viewusers">
          <AiOutlineTeam /> View Users 
        </Link>
        <Link to="/notficationreport">
          <AiFillFolderOpen /> Manage Reports
        </Link>
        <Link to="" className="logout" onClick={logout}>
          <AiOutlineLogout /> Logout{" "}
        </Link>
      </div>

      <div className="main">
        <div class="head">
          <div class="col-div-6">
            <span className="nav">
              {" "}
              <AiOutlinePullRequest /> Manage Account
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

        <div className="container-form">
          <h2>Register New User</h2>
          <p style={{color: 'red', textAlign:"center"}}>{errors}</p>
          <p style={{color: 'green', textAlign:"center",fontWeight:"bold"}}>{created}</p>
          <form className="form-details">
            <input
              type="text"
              placeholder="Full Name"
              className="inputbox"
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="inputbox"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Telephone"
              className="inputbox"
              required
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="inputbox"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <select className="inputbox" name="role" value={formData.role} onChange={handleChange}>
            {/* ["ACADEMICS", "LECTURER", "HOD", "CP", "FINANCE" */}
              <option>Select Role</option>
              <option value="LECTURER">Lecturer</option>
              <option value="HOD">HOD</option>
              <option value="CP">CP</option>
              <option value="FINANCE">Finance</option>
            </select>

            <input
              type="text"
              placeholder="Department"
              className="inputbox"
              required
              style={{display:`${displayDepartment}`}}
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
              <input
              type="text"
              placeholder="Course"
              className="inputbox"
              required
              style={{display:`${displayCourse}`}}
              name="course"
              value={formData.course}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Salary / RWF"
              className="inputbox"
              required
              style={{display:`${displaySalary}`}}
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
            
            <button type="button" className="sb-btn" onClick={handleSubmit}>
              Register
            </button>
            <button type="button" style={{padding:'5px',marginLeft:"30px",width:'70px',border:'none',borderRadius:'5px',color:'white',background:'#ccc',cursor:'pointer'}} onClick={clear}>
              Clear
            </button>
          </form>
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

export default CreateUserAccount;
