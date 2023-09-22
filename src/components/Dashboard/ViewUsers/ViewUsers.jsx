import React, { useEffect, useState } from "react";
import "./ViewUsersPage.scss";
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
import logo from "../../../assets/logo.jpg";
Modal.setAppElement("#root");

const ManageReports = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [display, setDisplay] = useState("block");
  const [top, setTop] = useState("0");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Current page of the table
  const usersPerPage = 4; // Number of users to display per page

  const [userData, setUserData] = useState([]);
  const [updateData, setUpdateData] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [displayDelete, setDisplayDelete] = useState("block");

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

  const openUpdateModal = () => {
    setUpdateModalIsOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  const ViewDetails = (id) => {
    axios
      .get(`http://localhost:4040/user/getUserById/${id}`)
      .then((res) => {
        setUserData(res.data);
        openModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUser = (id) => {
    axios
      .get(`http://localhost:4040/user/getUserById/${id}`)
      .then((res) => {
        console.log(res.data);
        setUpdateData(res.data);
        openUpdateModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:4040/user/delete/:${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [displayDepartment, setDisplayDepartment] = useState("none");
  const [displaySalary, setDisplaySalary] = useState("none");
  const [displayCourse, setDisplayCourse] = useState("none");
  const [errors, setErrors] = useState("");
  const [created, setCreated] = useState("");
  const [success,setSuccess] = useState("")

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    department: "",
    salary: "",
    course: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "role" && value === "LECTURER") {
      setDisplaySalary("block");
      setDisplayDepartment("block");
      setDisplayCourse("block");
    }
    if (name === "role" && value != "FINANCE") {
      if (displaySalary === "block") {
        setDisplaySalary("none");
        setDisplayCourse("none");
        return;
      }
      setDisplayDepartment("block");
    }

    if (name === "role" && (value === "ACADEMICS" || value === "FINANCE")) {
      setDisplayDepartment("none");
      setDisplaySalary("none");
      setDisplayCourse("none");
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (id) => {
  
    axios
      .put(`http://localhost:4040/user/updateById/:${id}`, formData)
      .then((res) => {
      setSuccess('Updated!')
      window.location.reload()
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.code == 11000) {
          setErrors("Email Already exists!");
        }
      });
  };

  const clear = () => {
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
      department: "",
      salary: "",
      course: "",
    });
  };

  return (
    <>
      <div id="mySidenav" className="sidenav">
        <div
          style={{
            width: "50px",
            height: "50px",
            position: "relative",
            left: "100px",
            bottom: "20px",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />
          <figcaption
            style={{
              fontSize: "10px",
              color: "#1E4FFD",
              width: "100px",
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
              <AiOutlinePullRequest /> Manage Users
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
              height: "auto",
            },
          }}
        >
          <h2 style={{ textAlign: "center" }}>{userData.fullName}'s Details</h2>
          <div style={{ display: "flex" }}>
            <div style={{ fontWeight: "bold" }}>
              <div>Full Names: </div>
              <div>Email: </div>
              <div>Phone Number: </div>
              <div>Course: </div>
              <div>Department: </div>
              <div>Salary: </div>
            </div>
            <div style={{ marginLeft: "50px" }}>
              <div>{userData.fullName}</div>
              <div>{userData.email}</div>
              <div>{userData.phoneNumber}</div>
              <div>{userData.course}</div>
              <div>{userData.department}</div>
              <div>{userData.salary}</div>
            </div>
          </div>
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
              position: "relative",
              left: "50%",
            }}
          >
            Close
          </button>
        </Modal>

        {/* update modal */}
        <Modal
          isOpen={updateModalIsOpen}
          onRequestClose={closeUpdateModal}
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
              height: "auto",
            },
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2>Edit User Details</h2>
            <p style={{ color: "red", textAlign: "center" }}>{errors}</p>
            <p
              style={{
                color: "green",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {success}
            </p>
            <form className="form-details">
              <input
                type="text"
                placeholder={updateData.fullName}
                className="inputbox"
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                style={{
                  border: "1px solid #ccc",
                  position: "relative",
                  right: "40px",
                }}
                
              />
              <input
                type="email"
                placeholder={updateData.email}
                className="inputbox"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  border: "1px solid #ccc",
                  position: "relative",
                  right: "40px",
                }}
              />
              <input
                type="text"
                placeholder={updateData.phoneNumber}
                className="inputbox"
                required
                name="phoneNumber"
                value={formData.phoneNumber}
                style={{
                  border: "1px solid #ccc",
                  position: "relative",
                  right: "40px",
                }}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder='....'
                className="inputbox"
                required
                name="password"
                value={formData.password}
                style={{
                  border: "1px solid #ccc",
                  position: "relative",
                  right: "40px",
                }}
                onChange={handleChange}
              />
              <select
                className="inputbox"
                name="role"
                value={formData.role}
                style={{
                  border: "1px solid #ccc",
                  position: "relative",
                  right: "40px",
                }}
                onChange={handleChange}
              >
                {/* ["ACADEMICS", "LECTURER", "HOD", "CP", "FINANCE" */}
                <option>{updateData.role}</option>
                <option value="LECTURER">Lecturer</option>
                <option value="HOD">HOD</option>
                <option value="CP">CP</option>
                <option value="FINANCE">Finance</option>
              </select>

              <input
                type="text"
                placeholder={updateData.department}
                className="inputbox"
                required
                style={{
                  display: `${displayDepartment}`,
                  border: "1px solid #ccc",
                  position: "relative",
                  right: "40px",
                }}
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder={updateData.course}
                className="inputbox"
                required
                style={{
                  display: `${displayCourse}`,
                  border: "1px solid #ccc",
                  position: "relative",
                  right: "40px",
                }}
                name="course"
                value={formData.course}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder={updateData.salary}
                className="inputbox"
                required
                style={{
                  display: `${displaySalary}`,
                  border: "1px solid #ccc",
                  position: "relative",
                  right: "40px",
                }}
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />

              <button
                type="button"
                className="sb-btn"
                onClick={()=>handleSubmit(updateData._id)}
                style={{ position: "relative", right: "50px" }}
              >
                Edit
              </button>
              <button
                type="button"
                style={{
                  padding: "5px",
                  marginLeft: "30px",
                  width: "70px",
                  border: "none",
                  borderRadius: "5px",
                  color: "white",
                  background: "#ccc",
                  cursor: "pointer",
                }}
                onClick={clear}
              >
                Clear
              </button>
            </form>
          </div>

          <button
            onClick={closeUpdateModal}
            style={{
              marginTop: "20px",
              border: "none",
              background: "red",
              color: "#fff",
              borderRadius: "3px",
              padding: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              position: "relative",
              left: "50%",
            }}
          >
            Close
          </button>
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
                          <AiFillDelete
                            color="red"
                            cursor={"pointer"}
                            onClick={() => deleteUser(user._id)}
                          />
                        </td>
                      )}
                      <td onClick={() => updateUser(user._id)}>
                        <AiFillEdit color="#1E4FFD" cursor={"pointer"} />
                      </td>
                      <td onClick={() => ViewDetails(user._id)}>
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
