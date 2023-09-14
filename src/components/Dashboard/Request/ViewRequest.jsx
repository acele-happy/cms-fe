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
  AiOutlineFolderView,
  AiFillFolderAdd,
} from "react-icons/ai";
import profile from "../../../images/profile.png";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ViewRequest = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [display, setDisplay] = useState("block");
  const [top, setTop] = useState("0");
  const [data, setData] = useState([]);
  const [approve, setApprove] = useState("block");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Current page of the table
  const usersPerPage = 4; // Number of users to display per page

  const [dispaybtncp, setDisplaybtncp] = useState("none")
  const [dispaybtnhod, setDisplaybtnhod] = useState("none")
  const [dispaybtnacademic, setDisplaybtnacademic] = useState("none")
  const [dispaybtnfinance, setDisplaybtnfinance] = useState("none")
  const [displaypendingcp, setDisplayendingcp] = useState('block')
  const [displaypendinghod, setDisplayendinghod] = useState('block')
  const [displaypendingacademic, setDisplayendingacademic] = useState('block')
  const [displaypendingfinance, setDisplayendingfinance] = useState('block')

  const [approved,setApproved] = useState("Approve")
  const [disable,setDisable] = useState(false)

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const filteredData = data.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );
  const startIndex = currentPage * usersPerPage;
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(jwtDecode(token));
    const decoded = jwtDecode(token);
    if (decoded.role != "ACADEMICS") {
      setDisplay("none");
      setTop("500px");
    }
    setName(decoded.name);
    setRole(decoded.role);

    axios
      .get(`http://localhost:4040/user/manageRequests/:${decoded.id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

      if(decoded.role === "CP"){
        setDisplaybtncp("block")
        setDisplayendingcp('none')
      }
      if(decoded.role==="HOD"){
        setDisplaybtnhod("block")
        setDisplayendinghod('none')
      }
      if(decoded.role==="ACADEMICS"){
        setDisplaybtnacademic("block")
        setDisplayendingacademic('none')
      }
      if(decoded.role==="FINANCE"){
        setDisplaybtnfinance('block')
        setDisplayendingfinance('none')
      }
  }, []);
  const logout = () => {
    localStorage.clear();
    const navigate = useNavigate();
    navigate("/");
    window.location.reload();
  };

  const confirmRequestCp = (Notid)=>{
    console.log(Notid)
    axios.post(`http://localhost:4040/user/confirmPaymentCP/:${Notid}`)
    .then(res=>{
      setApproved(res.data)
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
        <Link to="">
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
              <AiOutlinePullRequest /> Manage Pending Request
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

        <div className="myviewtbale">
          <table>
            <tr>
              <th>No</th>
              {/* <th>Names</th>
              <th>Email</th>
              <th>Telephone</th> */}
              <th>Message</th>
              <th style={{ display: `${display}` }}>Action</th>
              <th>CP</th>
              <th>Hod</th>
              <th>Academic</th>
              <th>Finance</th>
            </tr>
            {loading ? (
              <p style={{ fontWeight: "bold" }} className="loading-text"></p>
            ) : (
              <tbody>
                {data
                  .slice(startIndex, startIndex + usersPerPage)
                  .map((user, index) => (
                    <tr key={index}>
                      <td>{startIndex + index + 1}</td>
                      {/* <td>{user.names}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td> */}
                      <td>{user.message}</td>
                      <td style={{ display: `${display}` }}>
                        <button className="updatebtn">update</button>
                      </td>

                      <td style={{
                          color: "#ff0000",
                        }}>
                        <button
                          style={{
                            backgroundColor: "green",
                            border: "none",
                            padding: "5px",
                            borderRadius: "3px",
                            color: "#fff",
                            cursor: "pointer",
                            display:`${dispaybtncp}`
                          }}
                          onClick={()=>confirmRequestCp(user.notId)}
                        >
                          Approve
                        </button>
                        <span style={{display:`${displaypendingcp}`,color:user.cp === "Approved"?'green' : 'red'}}>{user.cp}</span>
                      </td>
                      <td
                        style={{
                          color: "#ff0000",
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "green",
                            border: "none",
                            padding: "5px",
                            borderRadius: "3px",
                            color: "#fff",
                            cursor: "pointer",
                            display:`${dispaybtnhod}`
                          }}
                        >
                          Approve
                        </button>
                        <span style={{display:`${displaypendinghod}`,color:user.hod === "Approved"?'green' : 'red'}}>{user.hod}</span>
                      </td>

                      <td
                        style={{
                          color: "#ff0000",
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "green",
                            border: "none",
                            padding: "5px",
                            borderRadius: "3px",
                            color: "#fff",
                            cursor: "pointer",
                            display:`${dispaybtnacademic}`
                          }}
                        >
                          Approve
                        </button>
                        <span style={{display:`${displaypendingacademic}`,color:user.academic === "Approved"?'green' : 'red'}}>{user.academic}</span>
                      </td>

                      <td
                        style={{
                          color: "#ff0000",
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "green",
                            border: "none",
                            padding: "5px",
                            borderRadius: "3px",
                            color: "#fff",
                            cursor: "pointer",
                            display:`${dispaybtnfinance}`
                          }}
                        >
                          Approve
                        </button>
                        <span style={{display:`${displaypendingfinance}`,color:user.finance === "Approved"?'green' : 'red'}}>{user.finance}</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
          <ReactPaginate
            previousLabel={<span className="pagination-label">Prev</span>}
            nextLabel={<span className="pagination-label">Next</span>}
            breakLabel={<span className="pagination-label">...</span>}
            breakClassName={"break-me"}
            pageCount={Math.ceil(data.length / usersPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            pageClassName={"pagination-button"}
            previousClassName={"pagination-button"}
            nextClassName={"pagination-button"}
          />
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
