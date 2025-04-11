import React, { useState } from "react";
import data from "./data.json";
const UserAvatar = ({ username }) => (
  <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>
);

const Comment = ({
  comment,
  isReply = false,
  onAddReply,
  onLike,
  level = 0,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const handleAddReply = () => {
    if (replyText.trim()) {
      onAddReply(comment.id, {
        id: Date.now().toString(),
        username: "You",
        timestamp: "Just now",
        text: replyText,
        likes: 0,
        replies: [],
      });
      setReplyText("");
      setIsReplying(false);
    }
  };

  const handleLike = () => {
    onLike(comment.id);
  };

  return (
    <div className={`comment-container ${isReply ? "is-reply" : ""}`}>
      <div className="comment-card">
        <div className="comment">
          <UserAvatar username={comment.username} />
          <div className="comment-content">
            <div className="comment-header">
              <span className="username">{comment.username}</span>
              <span className="timestamp">{comment.timestamp}</span>
            </div>
            <p className="comment-text">{comment.text}</p>
            <div className="comment-actions">
              <button onClick={handleLike}>👍 {comment.likes}</button>
              <button onClick={() => setIsReplying(true)}>Reply</button>
            </div>

            {isReplying && (
              <div className="reply-input">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button onClick={handleAddReply}>Post</button>
              </div>
            )}

            {comment.replies?.length > 0 && (
              <button
                className="toggle-replies"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies
                  ? "Hide replies"
                  : `View ${comment.replies.length} replies`}
              </button>
            )}

            {showReplies && (
              <div className="replies">
                {comment.replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    comment={reply}
                    isReply
                    onAddReply={onAddReply}
                    onLike={onLike}
                    level={level + 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentSection = () => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(data);
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now().toString(),
          username: "You",
          timestamp: "Just now",
          text: newComment,
          likes: 0,
          replies: [],
        },
      ]);
      setNewComment("");
    }
  };

  const handleAddReply = (parentId, reply) => {
    const update = (items) =>
      items.map((item) => {
        if (item.id === parentId) {
          return { ...item, replies: [...item.replies, reply] };
        } else if (item.replies) {
          return { ...item, replies: update(item.replies) };
        }
        return item;
      });
    setComments(update(comments));
  };

  const handleLikeComment = (commentId) => {
    const updateLikes = (items) =>
      items.map((item) => {
        if (item.id === commentId) {
          return { ...item, likes: item.likes + 1 };
        } else if (item.replies) {
          return { ...item, replies: updateLikes(item.replies) };
        }
        return item;
      });
    setComments(updateLikes(comments));
  };

  return (
    <div className="comment-section-wrapper">
      <style>{`
        .comment-section-wrapper {
          background: #f2f4f7;
          padding: 20px 0;
        }

        .comment-section {
          max-width: 700px;
          margin: auto;
          padding: 20px;
          font-family: sans-serif;
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .comment-container {
          position: relative;
          padding-left: 20px;
          margin-left: 10px;
        }

        .comment-container.is-reply::before {
          content: '';
          position: absolute;
          top: 15px;
          left: -10px;
          width: 20px;
          height: 100%;
          border-left: 2px solid #bbb;
          border-bottom: 2px solid #bbb;
          border-bottom-left-radius: 10px;
        }

        .comment-card {
          background: #fcfcfc;
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 16px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.03);
        }

        .comment {
          display: flex;
        }

        .user-avatar {
          width: 35px;
          height: 35px;
          background: #ddd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 10px;
        }

        .comment-content {
          flex: 1;
        }

        .comment-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .username {
          font-weight: bold;
        }

        .timestamp {
          font-size: 12px;
          color: #888;
        }

        .comment-text {
          margin: 5px 0;
        }

        .comment-actions {
          font-size: 13px;
          display: flex;
          gap: 15px;
        }

        .comment-actions button {
          background: none;
          border: none;
          cursor: pointer;
          color: #007bff;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .comment-actions button:hover {
          color: #0056b3;
        }

        .reply-input {
          margin-top: 10px;
          display: flex;
          gap: 10px;
        }

        .reply-input input {
          flex: 1;
          padding: 6px;
        }

        .reply-input button {
          padding: 6px 10px;
        }

        .toggle-replies {
          background: none;
          border: none;
          color: #007bff;
          margin-top: 5px;
          font-size: 13px;
          cursor: pointer;
        }

        .replies {
          margin-left: 20px;
        }

        .add-comment {
          display: flex;
          margin-bottom: 20px;
          gap: 10px;
        }

        .add-comment input {
          flex: 1;
          padding: 8px;
        }

        .add-comment button {
          padding: 8px 12px;
        }
      `}</style>
      <div className="comment-section">
        <div className="add-comment">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Post</button>
        </div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onAddReply={handleAddReply}
            onLike={handleLikeComment}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
