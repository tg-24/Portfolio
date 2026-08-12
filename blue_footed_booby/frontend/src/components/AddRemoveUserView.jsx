import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useLocalAuth } from "../hooks/useLocalAuth";
import { Report } from "./Report";
import { useNavigate } from "react-router";
import "../styles/UserAddRemove.css";

export const AddRemoveUserView = () => {
  const { user } = useLocalAuth();
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    email: "",
    is_teacher: false,
  });
  const [userList, setUserList] = useState([]);
  const [existedUsers, setExistedUsers] = useState([]);
  const [removeMode, setRemoveMode] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [removeList, setRemoveList] = useState([]);
  const [classId, setClassId] = useState(null);
  const [classes, setClasses] = useState([]);
  const [removeId, setRemoveId] = useState(null);
  const selectRef = useRef(null);
  const buttonRef = useRef(null);
  const popupRef = useRef(null);
  const tableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    fetchClasses();
  }, [user]);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`/api/classes/?teacher=${user.id}`);
      if (!response.ok) throw new Error("Failed to fetch classes");
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const showUsers = async () => {
    if (!user || !user.id) return;
    try {
      const currentId = removeMode ? removeId : classId;

      if (!currentId) return;
      const response = await fetch(
        `/api/classes/${currentId}/roster/?teacher=${user.id}`,
      );

      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      const result = data.filter((obj) => obj.is_teacher != true);
      setUserList(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user || !user.id) return;
    try {
      const userResponse = await fetch(
        `/api/classes/${classId}/roster/?teacher=${user.id}`,
      );
      if (!userResponse.ok) throw new Error("Failed to add a user");
      const data = await userResponse.json();
      let inroster = false;
      for (let i of data) {
        if (i.email == formData.email) {
          inroster = true;
        }
      }
      if (inroster) {
        alert("This user is already in the roster");
        buttonRef.current.disabled = true;
        setExistedUsers([...existedUsers, formData]);
        return;
      }
      const newUser = {
        student: formData.email,
      };

      const response = await fetch(`/api/classes/${classId}/roster/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error("Email isn't a union email");
      setFormData({
        ...formData,
        email: "",
      });

      selectRef.current.value = "";

      setClicked(true);
      showUsers();
    } catch (error) {
      if (error.message === "Email isn't a union email") {
        popupRef.current.textContent = "This isn't a union email";
        popupRef.current.hidden = false;
      }
      console.error("Error:", error);
    }
  };

  const Headers = () => {
    return (
      <div className="User-Header">
        <div className="page-trigger">
          <h1
            onClick={() => setRemoveMode(false)}
            style={
              !removeMode
                ? {
                    backgroundColor: "green",
                    borderRadius: "10px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    color: "white",
                  }
                : {}
            }
          >
            Add User
          </h1>
          <h1>&nbsp;/&nbsp;</h1>
          <h1
            onClick={() => setRemoveMode(true)}
            style={
              removeMode
                ? {
                    backgroundColor: "red",
                    borderRadius: "10px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    color: "white",
                  }
                : {}
            }
          >
            Remove User
          </h1>
        </div>

        <button
          className="return-click"
          onClick={() => navigate("/instructors")}
        >
          Return Home
        </button>
      </div>
    );
  };

  useEffect(() => {
    showUsers();
  }, [removeMode, removeId]);

  const UsersTable = () => {
    return (
      <div>
        <div className="table-title">
          {!removeMode ? (
            <h2>Class Roster</h2>
          ) : (
            <div className="selectedClass">
              <b>Selected Class:&nbsp;</b>
              <select
                value={!removeId ? "" : removeId}
                onChange={(e) => setRemoveId(e.target.value)}
                required
              >
                <option value="">Select a Class</option>
                {classes.map((obj) => (
                  <option key={obj.id} value={obj.id}>
                    {obj.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div
          ref={tableRef}
          className="userlist"
          style={removeMode ? { maxWidth: "1000px" } : {}}
        >
          <table>
            <thead className="table-head">
              <tr>
                <th>Student Name</th>
                <th>Id</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((obj, index) => (
                <tr
                  onClick={(e) => {
                    const prevScroll = tableRef.current.scrollTop;
                    if (!removeList.includes(obj.email))
                      setRemoveList([...removeList, obj.email]);
                    else {
                      setRemoveList(
                        removeList.filter((iter) => iter !== obj.email),
                      );
                    }
                    requestAnimationFrame(() => {
                      tableRef.current.scrollTop = prevScroll;
                    });
                  }}
                  style={
                    removeMode && removeList.includes(obj.email)
                      ? { backgroundColor: "red", color: "white" }
                      : { backgroundColor: "#f9fafb", color: "black" }
                  }
                  key={obj.id}
                >
                  <td>{obj.name}</td>
                  <td>{obj.id}</td>
                  <td>{obj.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const handleRemove = async () => {
    if (!user || !user.id) return;
    try {
      for (let removeUser of removeList) {
        const response = await fetch(`/api/classes/${removeId}/roster/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "remove",
            student: `${removeUser}`,
          }),
        });
        if (!response.ok) throw new Error("Failed to remove users");
      }
      setUserList((prevList) =>
        prevList.filter((obj) => !removeList.includes(obj.email)),
      );
      setRemoveList([]);
      showUsers();
    } catch (error) {
      console.error("Removing Users Failed", error);
    }
  };

  return (
    <div className="Page">
      {!removeMode ? (
        <div className="Add-Page">
          <div className="AddContainer">
            <Headers />
            <form onSubmit={handleSubmit}>
              <div className="input-fields">
                <div className="input-pop">
                  <label htmlFor="email">
                    <b>Student Email:</b>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (
                          userList &&
                          !userList.some((obj) => obj.email === e.target.value)
                        )
                          buttonRef.current.disabled = false;
                        popupRef.current.textContent =
                          "This email is already taken";
                      }}
                      autoComplete="email"
                      required
                    />
                  </label>
                  <div
                    className="popup"
                    ref={popupRef}
                    hidden={
                      !userList.some((obj) => obj.email === formData.email)
                    }
                  >
                    This email is already taken
                  </div>
                </div>
                <div className="selectedClass">
                  <b>Selected Class:&nbsp;</b>
                  <select
                    id="class-list"
                    ref={selectRef}
                    onChange={(e) => setClassId(e.target.value)}
                    required
                  >
                    <option value="">Select a Class</option>
                    {classes.map((obj) => (
                      <option key={obj.id} value={obj.id}>
                        {obj.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="user-add">
                  <button ref={buttonRef} id="submit-button" type="submit">
                    Submit User
                  </button>
                </div>
              </div>
            </form>
          </div>
          {clicked ? <UsersTable /> : null}
        </div>
      ) : (
        <div className="Remove-Container">
          <Headers />
          <UsersTable />
          <div className="ButtonDiv">
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => handleRemove()}
              type="button"
            >
              Delete Selected Users
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
