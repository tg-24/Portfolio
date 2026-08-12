import React from "react";
import "../styles/submission.css";

/**
 * Comments component displays code comments in a sidebar
 * @param {boolean} showAllComments - Whether to show all comments or just selected line
 * @param {number|null} selectedLine - The currently selected line number
 * @param {Object} commentsByLine - Comments organized by line number
 * @param {Object} user - User information
 */
const CommentItem = ({
  comment,
  getAuthorLabel,
  canDeleteComment,
  onDeleteComment,
}) => (
  <div className="comment">
    <p className="comment-author">{getAuthorLabel(comment)}</p>
    <p className="comment-content">{comment.comment}</p>
    {canDeleteComment?.(comment) && (
      <button
        type="button"
        className="delete-comment-button"
        onClick={() => onDeleteComment(comment.id)}
      >
        Delete
      </button>
    )}
  </div>
);

export const Comments = ({
  showAllComments,
  selectedLine,
  commentsByLine,
  getAuthorLabel,
  canDeleteComment,
  onDeleteComment,
}) => {
  const linesWithComments = Object.keys(commentsByLine).map(Number);

  if (!Object.keys(commentsByLine).length) {
    return null;
  }

  return (
    <div className="comments-sidebar">
      {showAllComments ? (
        <div className="all-comments">
          <h3>All Comments</h3>
          {linesWithComments.map((lineNumber) => (
            <div key={lineNumber} className="comment-group">
              <h4>Line {lineNumber}</h4>
              {commentsByLine[lineNumber].map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  getAuthorLabel={getAuthorLabel}
                  canDeleteComment={canDeleteComment}
                  onDeleteComment={onDeleteComment}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        selectedLine &&
        commentsByLine[selectedLine] && (
          <div className="line-comments selected">
            <h4>Line {selectedLine}</h4>
            {commentsByLine[selectedLine].map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                getAuthorLabel={getAuthorLabel}
                canDeleteComment={canDeleteComment}
                onDeleteComment={onDeleteComment}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};
