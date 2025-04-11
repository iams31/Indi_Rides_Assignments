import UserAvatar from "./UserAvatar";
const Comment = ({ comment, isReply = false, onAddReply, level = 0 }) => {
  const hasAnyReplies = comment.replies && comment.replies.length > 0;
  return (
    <div
      className={`comment-container ${isReply ? "is-reply" : ""} ${
        hasAnyReplies && !isReply ? "has-replies" : ""
      }`}
    >
      <div className="comment">
        <UserAvatar username={comment.username} />
        <div className="comment-content">
          {/* ... (rest of your comment content) ... */}
        </div>
      </div>
      {/* Render replies directly within the same container */}
      {hasAnyReplies && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              isReply={true}
              onAddReply={onAddReply}
              level={level + 1}
            />
          ))}
          {comment.hasMoreReplies && !showAllRepliesLocal && (
            <button
              className="more-replies-button"
              onClick={handleToggleReplies}
            >
              {/* ... */}
            </button>
          )}
          {comment.hasMoreReplies && showAllRepliesLocal && (
            <button
              className="more-replies-button"
              onClick={handleToggleReplies}
            >
              {/* ... */}
            </button>
          )}
        </div>
      )}
      {!hasAnyReplies && isReplying && (
        <div className="reply-input-area">{/* ... */}</div>
      )}
      {hasAnyReplies && isReplying && (
        <div className="reply-input-area">{/* ... */}</div>
      )}
    </div>
  );
};
