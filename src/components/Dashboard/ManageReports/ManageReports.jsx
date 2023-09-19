import React, { useEffect, useState } from "react";
import "./ManageReports.scss";
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
  AiFillDelete,
  AiFillEdit,
  AiOutlineMore,
} from "react-icons/ai";
import profile from "../../../images/profile.png";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ManageReports = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [display, setDisplay] = useState("block");
  const [top, setTop] = useState("0");
  const [data, setData] = useState([]);
  const [approve, setApprove] = useState("block");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Current page of the table
  const usersPerPage = 4; // Number of users to display per page

const [userData,setUserData] = useState([])

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      .get(`http://localhost:4040/user/getAllUsers`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const logout = () => {
    localStorage.clear();
    const navigate = useNavigate();
    navigate("/");
    window.location.reload();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const ViewDetails=(id)=>{
    axios.get(`http://localhost:4040/user/getUserById/${id}`)
    .then(res=>{
        setUserData(res.data)
        openModal()
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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              top: "50%",
              left: "60%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "40%",
              height: "100px",
              // textAlign: "center",
              // justifyContent: "center",
            },
          }}
        >
          <h2 style={{textAlign:'center'}}>{userData.fullName}'s Details</h2>
         <div style={{display:'flex',background:"red"}}>
          <div style={{fontWeight:"bold"}}>
            <div>Full Names: </div>
            <div>Email: </div>
            <div>Phone Number: </div>
            <div>Course: </div>
            <div>Department: </div>
            <div>Salary: </div>
          </div>
          <div style={{marginLeft:'10px'}}>
            <div>{userData.fullName}</div>
            <div>{userData.email}</div>
            <div>{userData.phoneNumber}</div>
            <div>{userData.course}</div>
            <div>{userData.department}</div>
            <div>{userData.salary}</div>
          </div>
         </div>
         <button onClick={closeModal} style={{marginTop:'20px',border:'none',background:'red',color:'#fff',borderRadius:'3px',padding:'8px',fontWeight:'bold',cursor:'pointer',position:'relative',left:"50%"}}>Close</button>
        </Modal>
        <div className="myviewtbale">
          <table>
            <tr>
              <th>No</th>
              <th>Names</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Role</th>
              <th>Delete</th>
              <th>Edit</th>
              <th>Details</th>
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
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>

                      <td
                        style={{
                          color: user.role === "ACADEMICS" ? "orange" : "",
                          fontWeight: user.role === "ACADEMICS" ? "bold" : "",
                        }}
                      >
                        {user.role}
                      </td>
                      {user.role === "ACADEMICS" ? (
                        <td></td>
                      ) : (
                        <td>
                          <AiFillDelete color="red" cursor={"pointer"} />
                        </td>
                      )}
                      <td>
                        <AiFillEdit color="#1E4FFD" cursor={"pointer"} />
                      </td>
                      <td onClick={()=>ViewDetails(user._id)}>
                        <AiOutlineMenu color="#057e7e" cursor={"pointer"} />
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

export default ManageReports;
