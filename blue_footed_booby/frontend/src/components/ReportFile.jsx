import React from "react";
import { useLocation, Navigate, useParams, Link } from "react-router";
import { useLocalAuth } from "../hooks/useLocalAuth";
import { useState, useEffect, useMemo } from "react";
import { Report } from "./Report";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Comments } from "./comments";
import SyntaxHighlighter from "react-syntax-highlighter";
import "../styles/ReportFile.css";

function getCommentAuthorLabel(comment, { isTeacher, nameByUserId, anonMap }) {
  if (isTeacher) {
    return nameByUserId[comment.user] ?? `User #${comment.user}`;
  }
  return anonMap.get(comment.user) ?? "Reviewer";
}

function buildAnonymousLabelMap(comments) {
  const ids = [...new Set(comments.map((c) => c.user))].sort((a, b) => a - b);
  const map = new Map();
  ids.forEach((id, index) => {
    const letter = String.fromCharCode(65 + index);
    map.set(id, `Student ${letter}`);
  });
  return map;
}

export const ReportFile = ({ isTeacher = false }) => {
  const { user } = useLocalAuth();
  const { assignmentId, userId } = useParams();
  const [file, setFile] = useState([]);
  const [comments, setComments] = useState([]);
  const [names, setNames] = useState([]);
  const [commentsByLine, setLineComments] = useState([]);
  const [assignment, setAssignment] = useState(null);
  const [nameByUserId, setNameByUserId] = useState({});
  const location = useLocation();

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

  useEffect(() => {
    const getFile = async () => {
      if (!user || !user.id) {
        return;
      }
      console.log(userId);
      const response = await fetch(
        `http://localhost:8000/api/assignments/${assignmentId}/submissions/`,
      );
      const data = await response.json();
      const result = data.filter((obj) => {
        return obj.user === Number(userId);
      });
      setFile(result);
    };
    getFile();
  }, [user, userId, assignmentId]);

  useEffect(() => {
    const getComments = async () => {
      if (userId) {
        const response = await fetch(
          `http://localhost:8000/api/assignments/${assignmentId}/submissions/`,
        );
        const data = await response.json();
        let result = structuredClone(data); //makes deep copy of data array so that objects within aren't the same
        result.forEach((obj) => {
          obj.comments = obj.comments.filter(
            (comm) => comm.user === Number(userId),
          );
        });

        result = result.filter((obj) => obj.comments.length != 0);

        result = result.filter((obj) => obj.user != userId);

        let names_list = [];
        result.forEach((obj) => {
          obj.files.forEach((arr) => {
            names_list.push(arr.name);
          });
        });
        names_list.filter((i) => i != location.pathname);
        console.log("data:", data);
        const targetSubmission = data.find(
          (sub) => sub.user === parseInt(userId),
        );
        if (!targetSubmission) {
          throw new Error(`Submission with ID ${userId} not found`);
        }
        console.log("target:", targetSubmission);
        const commentsByLine = targetSubmission.comments.reduce(
          (acc, comment) => {
            const lineNumber = comment.line_number;
            if (!acc[lineNumber]) {
              acc[lineNumber] = [];
            }
            acc[lineNumber].push(comment);
            return acc;
          },
          {},
        );
        console.log("data:", data);
        console.log("result:", result);
        console.log("names_list:", names);
        setComments(result);
        setLineComments(commentsByLine);
        setNames(names_list);
      }
    };
    getComments(userId);

    const getAssignment = async () => {
      const response = await fetch(`http://localhost:8000/api/assignments/`);
      const data = await response.json();
      const result = data.filter((obj) => obj.id === Number(assignmentId));
      console.log("assignment", result);
      if (result) {
        setAssignment(result[0].name);
      }
    };

    getAssignment();
    console.log("file:", file);
  }, [file, file, userId, assignmentId]);

  const numofComments = () => {
    let count = 0;
    for (const key in commentsByLine) {
      count += commentsByLine[key].length;
    }
    return count;
  };

  const anonMap = useMemo(() => {
    if (isTeacher) return new Map();
    return buildAnonymousLabelMap(comments);
  }, [comments, isTeacher]);

  const getAuthorLabel = (comment) =>
    getCommentAuthorLabel(comment, {
      isTeacher,
      nameByUserId,
      anonMap,
    });

  useEffect(() => {
    if (!isTeacher || !assignmentId) return;
    const fetchNames = async () => {
      try {
        const resp = await fetch(
          `http://localhost:8000/api/assignments/${assignmentId}/groups/`,
        );
        if (!resp.ok) return;
        const groups = await resp.json();
        const map = {};
        for (const group of groups) {
          if (group.users) {
            for (const u of group.users) {
              map[u.id] = u.name;
            }
          }
        }
        setNameByUserId(map);
      } catch (err) {
        console.error("Error fetching user names:", err);
      }
    };
    fetchNames();
  }, [isTeacher, assignmentId]);

  return file.length != 0 ? (
    <div className="overall-container">
      <div className="report-container">
        <div className="code-container">
          <header className="reportfile-header">
            <h2>Report by {file[0].user}</h2>
            <hr></hr>
            <div>
              Assignment Name: {assignment} (ID: {assignmentId})
            </div>
            <div>Number of comments: {numofComments()}</div>
            <div>File Name: {file[0].files[0].name}</div>
          </header>
          <code className="content">
            <SyntaxHighlighter
              wrapLongLines={true}
              showLineNumbers={true}
              language={getLanguage(file[0].files[0].name)}
              style={docco}
            >
              {file[0].files[0].content}
            </SyntaxHighlighter>
          </code>
        </div>
        <div className="comments">
          {commentsByLine.length != 0 && (
            <Comments
              showAllComments={true}
              selectedLine={null}
              commentsByLine={commentsByLine}
              user={user}
              getAuthorLabel={getAuthorLabel}
            />
          )}
        </div>
      </div>
      <div className="comments-title">
        <h2>
          <u>{names.length != 0 && "User comments"}</u>
        </h2>
      </div>
      <div className="comment-links">
        <ul>
          {file
            ? names.map((link_name, index) => (
                <li key={index}>
                  <Link
                    to={`/instructors/assignments/${assignmentId}/reportfile/${comments[index].user}`}
                  >
                    {link_name}
                  </Link>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  ) : null;
};
