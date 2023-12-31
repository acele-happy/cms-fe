import React,{useEffect, useState} from "react";
import "./Homepage.scss";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardHome from "../Dashboard/Home/DashboardHome";
import logo from "../../assets/logo.jpg";

const LoginForm = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors,setErrors] = useState("")
  const [data,setData] = useState([])

  const navigate = useNavigate()

  const handleLogin = ()=>{

    if(email == "" || password == ""){
      setErrors("Please provide all required fields!")
      return
    }
  
    axios.post("http://localhost:4040/user/login",{email:email,password:password})
    .then((res)=>{
      console.log("res.message")
      localStorage.setItem('token',res.data.token)
      navigate('/dashboardHome')

    })
    .catch(err=>{
      if(err.response.data == "Invalid email or password"){
        setErrors("Invalid email or password!")
        return
      }
      console.log((err.response.data== "Invalid email or password"))
    })
  }

  const handleEmailChange= (e)=>{
    setEmail(e.target.value)
  }
  const handlePasswordChange= (e)=>{
    setPassword(e.target.value)
  }


  return (
    <>
      <div className="navbar-container">
        <Link to="#" className="logo">
          
          <img
            src={logo}
            alt="logo"
            style={{ width: "130px", height: "90px", borderRadius: "5px" }}
          />
        
        </Link>
        <div className="logoName"> ISTM-<span className="logocolor">Goma</span></div>

        <ul className="nav-links">
          <li className="nav-item">
            <Link to="#">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="#">About</Link>
          </li>
          <li className="nav-item">
            <Link to="#">Get Started</Link>
          </li>
        </ul>
      </div>

      <div className="form-container">
        <div className="formcontent">
          <h2>Sign In</h2>
          <p style={{color: 'red', textAlign:"center"}}>{errors}</p>
          <form action="#">
            <input
              className="inputBox"
              type="text"
              placeholder="Your email..."
              required
              value={email}
              onChange={handleEmailChange}
            />

            <input
              className="inputBox"
              type="password"
              placeholder="Your password..."
              required
              value={password}
              onChange={handlePasswordChange}
            />

            {/* <Link to="/dashboardHome"> */}
              <button className="btnsubmit" onClick={handleLogin} type="button">Login</button>
            {/* </Link> */}
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginForm;
