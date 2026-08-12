import React, { useEffect, useState, useMemo} from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Comments } from "./comments";
import { useParams } from "react-router";
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

function buildAnonymousLabelMap(comments) {
  const ids = [...new Set(comments.map((c) => c.user))].sort((a, b) => a - b);
  const map = new Map();
  ids.forEach((id, index) => {
    const letter = String.fromCharCode(65 + index);
    map.set(id, `Student ${letter}`);
  });
  return map;
}

function getCommentAuthorLabel(comment, { isTeacher, nameByUserId, anonMap }) {
  if (isTeacher) {
    return nameByUserId[comment.user] ?? `User #${comment.user}`;
  }
  return anonMap.get(comment.user) ?? "Reviewer";
}

/**
 * SubmissionView component displays an existing submission with its details and comments.
 */
export const SubmissionView = ({isTeacher = false}) => {
  const { submissionId, assignmentId } = useParams();
  const { user } = useLocalAuth();

  const [submission, setSubmission] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [comments, setComments] = useState([]);
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [selectedLineForComment, setSelectedLineForComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nameByUserId, setNameByUserId] = useState({});
  const [teacherIds, setTeacherIds] = useState(() => new Set());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const submissionsResp = await fetch(
          `http://localhost:8000/api/assignments/${assignmentId}/submissions/`,
        );

        if (!submissionsResp.ok) {
          throw new Error(
            `Failed to fetch submissions: ${submissionsResp.statusText}`,
          );
        }
        const submissionsData = await submissionsResp.json();

        const targetSubmission = submissionsData.find(
          (sub) => sub.id === parseInt(submissionId),
        );

        if (!targetSubmission) {
          throw new Error(`Submission with ID ${submissionId} not found`);
        }

        console.log("Target submission data:", targetSubmission);

        setSubmission(targetSubmission);

        if (targetSubmission.files && targetSubmission.files.length > 0) {
          setFileName(targetSubmission.files[0].name);
          setFileContent(targetSubmission.files[0].content);
        }

        if (targetSubmission.comments) {
          setComments(targetSubmission.comments);
        }

        const assignmentResp = await fetch(
          `http://localhost:8000/api/assignments/${assignmentId}/`,
        );

        if (!assignmentResp.ok) {
          throw new Error(
            `Failed to fetch assignment: ${assignmentResp.statusText}`,
          );
        }

        const assignmentData = await assignmentResp.json();
        setAssignment(assignmentData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId && submissionId) {
      fetchData();
    }
  }, [assignmentId, submissionId]);

  useEffect(() => {
    if (!assignmentId) return;

    const fetchUserMeta = async () => {
      try {
        const [groupsResp, usersResp] = await Promise.all([
          fetch(
            `http://localhost:8000/api/assignments/${assignmentId}/groups/`,
          ),
          fetch("http://localhost:8000/api/users/"),
        ]);

        const names = {};
        const teachers = new Set();

        if (usersResp.ok) {
          const users = await usersResp.json();
          for (const u of users) {
            names[u.id] = u.name;
            if (u.is_teacher) {
              teachers.add(u.id);
            }
          }
        }

        if (groupsResp.ok) {
          const groups = await groupsResp.json();
          for (const group of groups) {
            if (group.users) {
              for (const u of group.users) {
                names[u.id] = u.name;
              }
            }
          }
        }

        setNameByUserId(names);
        setTeacherIds(teachers);
      } catch (err) {
        console.error("Error fetching user metadata:", err);
      }
    };

    fetchUserMeta();
  }, [assignmentId]);
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

  const language = getLanguage(fileName);

  const commentsByLine = comments.reduce((acc, comment) => {
    const lineNumber = comment.line_number;
    if (!acc[lineNumber]) {
      acc[lineNumber] = [];
    }
    acc[lineNumber].push(comment);
    return acc;
  }, {});

  const handleLineClick = (lineNumber) => {
    if (selectedLine === lineNumber) {
      setSelectedLine(null);
      setSelectedLineForComment(null);
    } else {
      setSelectedLine(lineNumber);
      setSelectedLineForComment(lineNumber);
    }
  };

  const toggleAllComments = () => {
    setShowAllComments(!showAllComments);
    if (!showAllComments) {
      setSelectedLine(null);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this student comment?")) return;

    try {
      const resp = await fetch(
        `http://localhost:8000/api/addcomment/${commentId}/`,
        { method: "DELETE" },
      );
      if (!resp.ok) {
        throw new Error("Failed to delete comment");
      }
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert("Failed to delete comment. Please try again.");
    }
  };

  const handleAddComment = async () => {
    if (!isTeacher && isPastDeadline(assignment.commenting_deadline)) {
      alert(
        "This deadline has passed. You are no longer allowed to comment.",
      );
      return;
    }

    if (!newComment.trim()) return;
    if (!selectedLineForComment) {
      alert("Please select a line to comment on.");
      return;
    }

    try {
      const fileId =
        submission.files && submission.files.length > 0
          ? submission.files[0].id
          : null;

      const comment = {
        submission: submissionId,
        user: user.id,
        comment: newComment,
        comment_type: selectedLineForComment ? "file" : "general",
        line_number: selectedLineForComment || null,
        submission_file: fileId,
      };

      const resp = await fetch("http://localhost:8000/api/addcomment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });

      if (resp.ok) {
        const newCommentData = await resp.json();

        const updatedComments = [...comments, newCommentData];
        setComments(updatedComments);
        setNewComment("");

        if (newCommentData.line_number) {
          const lineNum = newCommentData.line_number;
          if (!commentsByLine[lineNum]) {
            commentsByLine[lineNum] = [];
          }
          commentsByLine[lineNum].push(newCommentData);
        }
      } else {
        throw new Error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment. Please try again.");
    }
  };

  const linesWithComments = Object.keys(commentsByLine).map(Number);

  if (loading) {
    return <div>Loading submission...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!submission || !assignment) {
    return <div>Submission not found</div>;
  }

  const canAddComments =
    isTeacher || !isPastDeadline(assignment.commenting_deadline);

  return (
    <div className="submission-wrapper">
      <div className="submission">
        <h2>Submission by {submission.user}</h2>
        <p>
          Assignment: {assignment.name} (ID: {assignment.id})
        </p>
        <p>Submission ID: {submission.id}</p>
        <p>File Name: {fileName}</p>

        {fileContent && (
          <button onClick={toggleAllComments}>
            {showAllComments ? "Hide All Comments" : "Show All Comments"}
          </button>
        )}

        <div className="code-container">
          {fileContent && (
            <SyntaxHighlighter
              lineProps={(lineNumber) => {
                const hasComments = linesWithComments.includes(lineNumber);
                const isSelected = selectedLine === lineNumber;
                return {
                  style: {
                    cursor: "pointer",
                    backgroundColor: isSelected
                      ? "rgba(255, 210, 0, 0.2)"
                      : hasComments
                        ? "rgba(255, 255, 0, 0.1)"
                        : "transparent",
                  },
                  onClick() {
                    handleLineClick(lineNumber);
                  },
                };
              }}
              wrapLongLines={true}
              showLineNumbers={true}
              language={language}
              style={docco}
            >
              {fileContent}
            </SyntaxHighlighter>
          )}
        </div>

        {canAddComments && (
          <div className="comment-form">
            <h3>
              Add Comment{" "}
              {selectedLineForComment
                ? `(Line ${selectedLineForComment})`
                : "(Select Line to Comment)"}
            </h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              rows={4}
            />
            <div>
              <button onClick={handleAddComment}>Submit Comment</button>
              {selectedLineForComment && (
                <button onClick={() => setSelectedLineForComment(null)}>
                  Cancel Line Selection
                </button>
              )}
            </div>
          </div>
        )}

        {!isTeacher && !canAddComments && (
          <p className="error-message">
            This deadline has passed. You are no longer allowed to comment.
          </p>
        )}
      </div>

      <Comments
        showAllComments={showAllComments}
        selectedLine={selectedLine}
        commentsByLine={commentsByLine}
        getAuthorLabel={getAuthorLabel}
        canDeleteComment={(comment) =>
          isTeacher && !teacherIds.has(comment.user)
        }
        onDeleteComment={handleDeleteComment}
      />
    </div>
  );
};
