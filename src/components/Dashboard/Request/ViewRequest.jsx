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
import Modal from "react-modal";
import logo from '../../../assets/logo.jpg'
Modal.setAppElement("#root");

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

  const [dispaybtncp, setDisplaybtncp] = useState("none");
  const [dispaybtnhod, setDisplaybtnhod] = useState("none");
  const [dispaybtnacademic, setDisplaybtnacademic] = useState("none");
  const [dispaybtnfinance, setDisplaybtnfinance] = useState("none");
  const [displaypendingcp, setDisplayendingcp] = useState("block");
  const [displaypendinghod, setDisplayendinghod] = useState("block");
  const [displaypendingacademic, setDisplayendingacademic] = useState("block");
  const [displaypendingfinance, setDisplayendingfinance] = useState("block");

  const [approvedcpArray, setApprovedcpArray] = useState(data.map(() => false));
  const [approvedhodArray, setApprovedhodArray] = useState(
    data.map(() => false)
  );
  const [approvedacademicArray, setApprovedacademicArray] = useState(
    data.map(() => false)
  );
  const [approvedfinanceArray, setApprovedfinanceArray] = useState(
    data.map(() => false)
  );

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
      .get(`http://localhost:4040/user/manageRequests/:${decoded.id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    if (decoded.role === "CP") {
      setDisplaybtncp("block");
      setDisplayendingcp("none");
    }
    if (decoded.role === "HOD") {
      setDisplaybtnhod("block");
      setDisplayendinghod("none");
    }
    if (decoded.role === "ACADEMICS") {
      setDisplaybtnacademic("block");
      setDisplayendingacademic("none");
    }
    if (decoded.role === "FINANCE") {
      setDisplaybtnfinance("block");
      setDisplayendingfinance("none");
    }
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

  const confirmRequestCp = (index, Notid) => {
    axios
      .post(`http://localhost:4040/user/confirmPaymentCP/:${Notid}`)
      .then((res) => {
        const updatedApprovedCpArray = [...approvedcpArray];
        updatedApprovedCpArray[index] = true;
        setApprovedcpArray(updatedApprovedCpArray);
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
        openModal();
      });
  };

  const confirmRequestHod = (index, Notid) => {
    axios
      .post(`http://localhost:4040/user/confirmPaymentHOD/:${Notid}`)
      .then((res) => {
        const updatedApprovedhodArray = [...approvedhodArray];
        updatedApprovedhodArray[index] = true;
        setApprovedhodArray(updatedApprovedhodArray);
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
        openModal();
      });
  };

  const confirmRequestAcademic = (index, Notid) => {
    axios
      .post(`http://localhost:4040/user/confirmPaymentAcademic/:${Notid}`)
      .then((res) => {
        const updatedApprovedacademicArray = [...approvedacademicArray];
        updatedApprovedacademicArray[index] = true;
        setApprovedacademicArray(updatedApprovedacademicArray);
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
        openModal();
      });
  };

  const confirmRequestFinance = (index, Notid) => {
    axios
      .post(`http://localhost:4040/user/confirmPaymentFinance/:${Notid}`)
      .then((res) => {
        const updatedApprovedfinanceArray = [...approvedfinanceArray];
        updatedApprovedfinanceArray[index] = true;
        setApprovedfinanceArray(updatedApprovedfinanceArray);
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
        openModal();
      });
  };


  const [filterText, setFilterText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  const filterUsers = () => {
    const filtered = data.filter((user) =>
      user.names.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredUsers(filtered);
  };
  
  useEffect(() => {
    filterUsers();
  }, [filterText]);

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
              textAlign: "center",
              justifyContent: "center",
            },
          }}
        >
          <h2 style={{ color: "#FF9494" }}>Error!</h2>
          <div>{errorMessage}</div>
          <button
            onClick={closeModal}
            style={{
              marginTop: "20px",
              border: "none",
              background: "red",
              color: "#fff",
              borderRadius: "3px",
              padding: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </Modal>

        <input
          type="text"
          placeholder="Search by Name" className="mysearch" value={filterText}
          onChange={(e) => setFilterText(e.target.value)} />
        
        <div className="myviewtbale">
          <table>
            <tr>
              <th>No</th>
              <th>Names</th>
              <th>Email</th>
              <th>Message</th>
              <th>CP</th>
              <th>Hod</th>
              <th>Academic</th>
              <th>Finance</th>
            </tr>
            {loading ? (
              <p style={{ fontWeight: "bold" }} className="loading-text"></p>
            ) : (
              <tbody>
                {(filterText.trim() === '' ? data : filteredUsers)
                  .slice(startIndex, startIndex + usersPerPage)
                  .map((user, index) => (
                    <tr key={index}>
                      <td>{startIndex + index + 1}</td>
                      <td>{user.names}</td>
                      <td>{user.email}</td>
                      <td>{user.message}</td>

                      <td
                        style={{
                          color: "#ff0000",
                        }}
                      >
                        <div style={{ display: `${dispaybtncp}` }}>
                          {user.cp === "Approved" ? (
                            <span style={{ color: "green" }}>Approved</span>
                          ) : (
                            <button
                              style={{
                                backgroundColor: approvedcpArray[index]
                                  ? "#035603"
                                  : "#008000",
                                border: "none",
                                padding: "5px",
                                borderRadius: "3px",
                                color: "#fff",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                confirmRequestCp(index, user.notId)
                              }
                              disabled={approvedcpArray[index]}
                            >
                              {approvedcpArray[index] ? "Approved" : "Approve"}
                            </button>
                          )}
                        </div>
                        <span
                          style={{
                            display: `${displaypendingcp}`,
                            color: user.cp === "Approved" ? "green" : "red",
                          }}
                        >
                          {user.cp}
                        </span>
                      </td>
                      <td
                        style={{
                          color: "#ff0000",
                        }}
                      >
                        <div style={{ display: `${dispaybtnhod}` }}>
                          {user.hod === "Approved" ? (
                            <span style={{ color: "green" }}>Approved</span>
                          ) : (
                            <button
                              style={{
                                backgroundColor: approvedhodArray[index]
                                  ? "#035603"
                                  : "#008000",
                                border: "none",
                                padding: "5px",
                                borderRadius: "3px",
                                color: "#fff",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                confirmRequestHod(index, user.notId)
                              }
                              disabled={approvedhodArray[index]}
                            >
                              {approvedhodArray[index] ? "Approved" : "Approve"}
                            </button>
                          )}
                        </div>
                        <span
                          style={{
                            display: `${displaypendinghod}`,
                            color: user.hod === "Approved" ? "green" : "red",
                          }}
                        >
                          {user.hod}
                        </span>
                      </td>

                      <td
                        style={{
                          color: "#ff0000",
                        }}
                      >
                        <div style={{ display: `${dispaybtnacademic}` }}>
                          {user.academic === "Approved" ? (
                            <span style={{ color: "green" }}>Approved</span>
                          ) : (
                            <button
                              style={{
                                backgroundColor: approvedacademicArray[index]
                                  ? "#035603"
                                  : "#008000",
                                border: "none",
                                padding: "5px",
                                borderRadius: "3px",
                                color: "#fff",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                confirmRequestAcademic(index, user.notId)
                              }
                              disabled={approvedacademicArray[index]}
                            >
                              {approvedacademicArray[index]
                                ? "Approved"
                                : "Approve"}
                            </button>
                          )}
                        </div>
                        <span
                          style={{
                            display: `${displaypendingacademic}`,
                            color:
                              user.academic === "Approved" ? "green" : "red",
                          }}
                        >
                          {user.academic}
                        </span>
                      </td>

                      <td
                        style={{
                          color: "#ff0000",
                        }}
                      >
                        <div style={{ display: `${dispaybtnfinance}` }}>
                          {user.finance === "Approved" ? (
                            <span style={{ color: "green" }}>Approved</span>
                          ) : (
                            <button
                              style={{
                                backgroundColor: approvedfinanceArray[index]
                                  ? "#035603"
                                  : "#008000",
                                border: "none",
                                padding: "5px",
                                borderRadius: "3px",
                                color: "#fff",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                confirmRequestFinance(index, user.notId)
                              }
                              disabled={approvedfinanceArray[index]}
                            >
                              {approvedfinanceArray[index]
                                ? "Approved"
                                : "Approve"}
                            </button>
                          )}
                        </div>
                        <span
                          style={{
                            display: `${displaypendingfinance}`,
                            color:
                              user.finance === "Approved" ? "green" : "red",
                          }}
                        >
                          {user.finance}
                        </span>
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
