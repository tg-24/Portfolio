import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useLocalAuth } from "../hooks/useLocalAuth";
import "../styles/Homepage.css";
import { Report } from "./Report";
import { useNavigate } from "react-router";

export const InstructorHomepage = () => {
  const { user } = useLocalAuth();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newClass, setNewClass] = useState({
    code: "",
    name: "",
    term: "",
    year: new Date().getFullYear(),
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (!user || !user.id) return;
    fetchClasses();
    fetchAssignments();
  }, [user]);

  const fetchClasses = async () => {
    try {
      const classResponse = await fetch(
        "http://localhost:8000/api/classes/?teacher=" + user.id,
      );
      if (!classResponse.ok) throw new Error("Failed to fetch /api/classes/");
      const classData = await classResponse.json();
      console.log("Fetched classes:", classData);

      setClasses(classData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching classes or assignments:", err);
      setError("Could not load classes and assignments.");
      setLoading(false);
    }
  };

  const fetchAssignments = async () => {
    try {
      const assignmentResponse = await fetch(
        "http://localhost:8000/api/assignments/?teacher=" + user.id,
      );
      if (!assignmentResponse.ok)
        throw new Error("Failed to fetch /api/assignments/");
      const assignmentData = await assignmentResponse.json();
      console.log("Fetched assignments:", assignmentData);

      setAssignments(assignmentData);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setError("Could not load assignments.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddClass = async () => {
    if (
      !newClass.code.trim() ||
      !newClass.name.trim() ||
      !newClass.term.trim()
    ) {
      setError("Code, name, and term are required");
      return;
    }

    console.log({
      code: newClass.code,
      name: newClass.name,
      term: newClass.term,
      year: parseInt(newClass.year),
      start_date: newClass.start_date,
      end_date: newClass.end_date,
      teacher: user.id,
    });

    try {
      const response = await fetch("http://localhost:8000/api/classes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: newClass.code,
          name: newClass.name,
          term: newClass.term,
          year: parseInt(newClass.year),
          start_date: newClass.start_date,
          end_date: newClass.end_date,
          teacher: user.id,
        }),
      });

      if (!response.ok) throw new Error("Failed to create class");

      const createdClass = await response.json();
      setClasses((prev) => [...prev, { ...createdClass, assignments: [] }]);

      setNewClass({
        code: "",
        name: "",
        term: "",
        year: new Date().getFullYear(),
        start_date: "",
        end_date: "",
      });
    } catch (err) {
      console.error("Error creating class:", err);
      setError("Could not add new class.");
    }
  };

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const noClasses = classes.length === 0;

  return (
    <div className="homepage-container">
      <section>
        <button
          className="assignment-button"
          onClick={() => navigate("/instructors/assignments/add")}
        >
          Add Assignment
        </button>
        <button
          className="userAddRemove-button"
          onClick={() => navigate("/instructors/assignments/addRemoveUser")}
        >
          Add/Remove User
        </button>
      </section>

      <section>
        <h2 className="homepage-header">
          Your Classes, Assignments &amp; Reports
        </h2>

        <div className="add-class-form">
          <h3>Add New Class</h3>
          <div>
            <label>
              Code:
              <input
                type="text"
                name="code"
                placeholder="e.g. CSC 107"
                value={newClass.code}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                placeholder="e.g. Creative Computing"
                value={newClass.name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Term:
              <select
                name="term"
                value={newClass.term}
                onChange={handleInputChange}
              >
                <option value="">Select Term</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Year:
              <input
                type="number"
                name="year"
                value={newClass.year}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Start Date:
              <input
                type="date"
                name="start_date"
                value={newClass.start_date}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              End Date:
              <input
                type="date"
                name="end_date"
                value={newClass.end_date}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button onClick={handleAddClass}>Add Class</button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {noClasses ? (
          <p>No classes exist yet. Use the form above to add a class.</p>
        ) : (
          <>
            <div>
              <h2>
                <u></u>Assignments
              </h2>
            </div>
            {classes.map((cls) => {
              console.log(cls.id, assignments);
              const assignmentsForClass = assignments.filter(
                (assignment) => assignment.course === cls.id,
              );

              return (
                <div className={"classes"} key={cls.id}>
                  <div>
                    <h3>{cls.name}</h3>
                    <h5>
                      {cls.code} - {cls.term} {cls.year}
                    </h5>
                  </div>

                  {assignmentsForClass.length > 0 ? (
                    <ul>
                      {assignmentsForClass.map((assignment) => (
                        <li key={assignment.id}>
                          <Link
                            to={`/instructors/assignments/${assignment.id}`}
                          >
                            {assignment.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No assignments yet for this class.</p>
                  )}
                </div>
              );
            })}
          </>
        )}
        <div className="reports">
          <Report classes={classes} isTeacher={true} />
        </div>
      </section>
    </div>
  );
};
