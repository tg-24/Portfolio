import React from "react";
import "../styles/AssignmentView.css";
import { useNavigate, useParams } from "react-router";
import { useLocalAuth } from "../hooks/useLocalAuth";
import { isPastDeadline } from "../utils/deadlines";

export const AssignmentView = ({ isTeacher }) => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useLocalAuth();

  const [assignment, setAssignment] = React.useState(null);
  const [group, setGroup] = React.useState([]);
  const [dueDate, setDueDate] = React.useState("");
  const [submissions, setSubmissions] = React.useState(null);
  const [currentDate, setCurrentDate] = React.useState(new Date());

  React.useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  React.useEffect(() => {
    if (!user || !user.id) return;
    const fetchAssignment = async () => {
      try {
        const userParam = isTeacher ? "teacher" : "student";
        const resp = await fetch(
          `http://localhost:8000/api/assignments/${assignmentId}/?${userParam}=${user.id}`,
        );
        const data = await resp.json();
        if (resp.ok) {
          console.log("Assignment data:", data);
          setAssignment(data);
          setDueDate(new Date(data.submission_deadline).toLocaleDateString());
        } else {
          console.error("Failed to fetch assignment:", data);
        }
      } catch (error) {
        console.error("Error fetching assignment:", error);
      }
    };

    const fetchGroup = async () => {
      try {
        const userParam = isTeacher ? "teacher" : "student";
        const resp = await fetch(
          `http://localhost:8000/api/assignments/${assignmentId}/groups/?${userParam}=${user.id}`,
        );
        const data = await resp.json();

        console.log("Group data:", data);

        if (resp.ok && data.length > 0 && data[0].users) {
          // filter out the current user from the group
          setGroup(data[0].users.filter((member) => member.id !== user.id));
        } else {
          console.error("No groups found for this assignment.");
          setGroup([]);
        }
      } catch (error) {
        console.error("Error fetching group:", error);
      }
    };

    const fetchSubmissions = async () => {
      try {
        const resp = await fetch(
          `http://localhost:8000/api/assignments/${assignmentId}/submissions/`,
        );
        const data = await resp.json();
        console.log("Submissions data:", data);
        if (resp.ok) {
          setSubmissions(data);
        } else {
          console.error("Failed to fetch submissions:", data);
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchAssignment();
    fetchGroup();
    fetchSubmissions();
  }, [user, isTeacher, assignmentId]);

  if (!assignment) {
    return (
      <div>
        <h2>Loading assignment...</h2>
      </div>
    );
  }

  const userSubmission = submissions
    ? submissions.find((s) => s.user === user.id)
    : null;

  const getReturnPath = () => {
    return isTeacher ? "/instructors/homepage" : "/students/homepage";
  };

  const getSubmissionPath = (submissionId) => {
    const basePath = isTeacher ? "/instructors" : "/students";
    return `${basePath}/assignments/${assignmentId}/submissions/${submissionId}`;
  };

  const getSubmitPath = () => {
    return `/students/assignments/${assignmentId}/submissions/submit`;
  };

  const submissionDeadlinePassed = isPastDeadline(
    assignment.submission_deadline,
  );

  return (
    <div className="student-assignment-container">
      <header className="student-assignment-header">
        <div>
          <h1>{isTeacher ? "Instructor" : "Student"} Assignment Page</h1>
          <h2>{assignment.name}</h2>
        </div>
        <button
          className="return-button"
          onClick={() => navigate(getReturnPath())}
        >
          Return to Home
        </button>
      </header>

      <div className="student-assignment-content">
        {!isTeacher && (
          <div className="assignment-actions">
            {submissionDeadlinePassed && !userSubmission ? (
              <p className="error-message">
                This deadline has passed. You can no longer submit a file.
              </p>
            ) : (
              <button
                className="view-button"
                onClick={() => {
                  if (userSubmission) {
                    navigate(getSubmissionPath(userSubmission.id));
                  } else {
                    navigate(getSubmitPath());
                  }
                }}
              >
                {userSubmission ? "View My Submission" : "Submit Assignment"}
              </button>
            )}
            <span className="due-date">Due date: {dueDate}</span>
          </div>
        )}

        <h3>{isTeacher ? "Student" : "Group"} Members</h3>
        <table className="group-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Submission</th>
            </tr>
          </thead>
          <tbody>
            {group.map((member) => {
              const submission = submissions
                ? submissions.find((s) => s.user === member.id)
                : null;

              return (
                <tr
                  key={member.id}
                  onClick={() => {
                    if (!submission) {
                      alert("No submission found for this member.");
                      return;
                    }

                    navigate(getSubmissionPath(submission.id));
                  }}
                >
                  <td>{member.name}</td>
                  <td>
                    {submission
                      ? submission.files && submission.files.length > 0
                        ? submission.files[0].name
                        : "Submitted"
                      : "No submission"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
