import React from "react";
import { useNavigate, useParams } from "react-router";
import { useLocalAuth } from "../hooks/useLocalAuth";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { Report } from "./Report";
import "../styles/ReportView.css";

export const ReportView = ({ isTeacher }) => {
  const { user } = useLocalAuth();
  const { assignmentId, assignmentName } = useParams();
  const [report, setReport] = useState([]);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        if (report.length == 0) {
          const response = await fetch(
            `http://localhost:8000/api/assignments/${assignmentId}/submissions/`,
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch assignment: ${response.statusText}`,
            );
          }
          const result = await response.json();
          setReport(result);
        }
      } catch (error) {
        console.error("Error fetching assignment:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getGroups = async () => {
      try {
        if (report.length != 0) {
          if (!user || !user.id) return;
          const response = await fetch(
            `http://localhost:8000/api/assignments/${assignmentId}/groups/?teacher=${user.id}`,
          );
          const submiss = await fetch(
            `http://localhost:8000/api/assignments/${assignmentId}/submissions/?teacher=${user.id}`,
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch assignment: ${response.statusText}`,
            );
          }
          let result = await response.json();
          let data = await submiss.json();

          const groupresult = data.reduce((arr, next) => {
            result.forEach((obj) => {
              let temp = obj.users.find((obj2) => obj2.id === next.user);
              if (temp) {
                arr.push(temp);
              }
            });

            return arr;
          }, []);

          setGroups([...groupresult]);
        }
      } catch (error) {
        console.error("Error fetching assignment:", error);
      }
    };
    getGroups();
  }, [user, report]);

  const getSubmissionPath = (submissionId) => {
    const basePath = isTeacher ? "/instructors" : "/students";
    return `${basePath}/assignments/${assignmentId}/reportfile/${submissionId}`;
  };

  return (
    <div className="report-page">
      <header className="intro">
        <div>
          <h1>Instructor Report Page</h1>
          <h2>{assignmentName}</h2>
        </div>
        <button
          className="return-home"
          onClick={() => navigate("/instructors/homepage")}
        >
          Return Home
        </button>
      </header>
      <div className="report-list-container">
        <h3>Student Members</h3>
        <table className="group-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Submission</th>
            </tr>
          </thead>
          <tbody>
            {report
              ? groups.map((obj, index) => {
                  return (
                    <tr
                      key={obj.id}
                      onClick={() => navigate(getSubmissionPath(obj.id))}
                    >
                      <td>{obj.name}</td>
                      <td>{report[index].files[0].name}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};
