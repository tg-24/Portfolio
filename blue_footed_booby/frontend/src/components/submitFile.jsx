import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useLocalAuth } from "../hooks/useLocalAuth";
import { isPastDeadline } from "../utils/deadlines";
import "../styles/submission.css";

// Determine language based on file extension
const getLanguage = (filename) => {
  if (!filename) return "text";
  const extension = filename.split(".").pop().toLowerCase();
  const languageMap = {
    js: "javascript",
    jsx: "jsx",
    py: "python",
    java: "java",
    html: "html",
    css: "css",
    cpp: "cpp",
    c: "c",
  };
  return languageMap[extension] || "text";
};

export const SubmitFile = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useLocalAuth();

  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [assignment, setAssignment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const resp = await fetch(
          `http://localhost:8000/api/assignments/${assignmentId}/`,
        );

        if (!resp.ok) {
          throw new Error(`Failed to fetch assignment: ${resp.statusText}`);
        }

        const data = await resp.json();
        setAssignment(data);
      } catch (error) {
        console.error("Error fetching assignment:", error);
        setError("Failed to load assignment details");
      }
    };

    if (assignmentId) {
      fetchAssignment();
    }
  }, [assignmentId]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmitAssignment = async () => {
    if (isPastDeadline(assignment.submission_deadline)) {
      alert("This deadline has passed. You can no longer submit a file.");
      return;
    }

    if (!fileName || !fileContent) {
      alert("Please select a file to upload");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const submissionData = {
        assignment: assignmentId,
        user: user.id,
        submitted_at: new Date().toISOString(),
      };

      const resp = await fetch("http://localhost:8000/api/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!resp.ok) {
        throw new Error(`Failed to create submission: ${resp.statusText}`);
      }

      const submission = await resp.json();

      const fileData = {
        submission: submission.id,
        name: fileName,
        content: fileContent,
      };

      const fileResp = await fetch("http://localhost:8000/api/addfile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fileData),
      });

      if (!fileResp.ok) {
        throw new Error(`Failed to upload file: ${fileResp.statusText}`);
      }

      alert("Assignment submitted successfully!");
      navigate(`/students/assignments/${assignmentId}`);
    } catch (error) {
      console.error("Error submitting assignment:", error);
      setError(`Failed to submit: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const language = getLanguage(fileName);

  if (error) {
    return (
      <div className="submission-wrapper">
        <div className="submission">
          <h2>Error</h2>
          <p className="error-message">{error}</p>
          <button
            onClick={() => navigate(`/students/assignments/${assignmentId}`)}
          >
            Back to Assignment
          </button>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return <div>Loading assignment...</div>;
  }

  if (isPastDeadline(assignment.submission_deadline)) {
    return (
      <div className="submission-wrapper">
        <div className="submission">
          <h2>{assignment.name}</h2>
          <p className="error-message">
            This deadline has passed. You can no longer submit a file.
          </p>
          <button
            onClick={() => navigate(`/students/assignments/${assignmentId}`)}
          >
            Back to Assignment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="submission-wrapper">
      <div className="submission">
        <div className="file-upload">
          <h2>Upload Your Code for {assignment.name}</h2>
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".js,.jsx,.py,.java,.html,.css,.cpp,.c,.txt"
          />
          {fileName && <p>Selected File: {fileName}</p>}
        </div>

        <div className="code-container">
          {fileContent && (
            <SyntaxHighlighter
              wrapLongLines={true}
              showLineNumbers={true}
              language={language}
              style={docco}
            >
              {fileContent}
            </SyntaxHighlighter>
          )}
        </div>

        {fileName && fileContent && (
          <button
            className="submit-button"
            onClick={handleSubmitAssignment}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Assignment"}
          </button>
        )}
      </div>
    </div>
  );
};
