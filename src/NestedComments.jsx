import React, { useState } from "react";

const initialComments = [
  {
    id: 1,
    text: "First comment",
    children: [
      {
        id: 2,
        text: "Reply to the first comment",
        children: [
          { id: 3, text: "A reply to the First Comment's reply", children: [] },
        ],
      },
    ],
  },
  {
    id: 4,
    text: "Second comment",
    children: [],
  },
];

const NestedComments = () => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const addComment = (parentId = null, text) => {
    if (!text.trim()) return;

    const newComment = { id: Date.now(), text, children: [] };

    if (parentId === null) {
      setComments([...comments, newComment]);
    } else {
      setComments(updateNestedComments(comments, parentId, newComment));
    }
  };

  const updateNestedComments = (commentList, parentId, newComment) => {
    return commentList.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, children: [...comment.children, newComment] };
      } else if (comment.children.length > 0) {
        return {
          ...comment,
          children: updateNestedComments(comment.children, parentId, newComment),
        };
      }
      return comment;
    });
  };

  const renderComments = (commentList, level = 0) => {
    return commentList.map((comment) => (
      <div key={comment.id} style={{ marginLeft: `${level * 20}px`, marginBottom: "10px" }}>
        <p>
          {`"${comment.text}",  Level -> ${level}`}
          <button
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={() => {
              const replyText = prompt("Enter your reply:");
              if (replyText) addComment(comment.id, replyText);
            }}
          >
            Reply
          </button>
        </p>
        {renderComments(comment.children, level + 1)}
      </div>
    ));
  };

  return (
    <div style={{color: 'black'}}>
      <h3>Nested Comments</h3>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={() => addComment(null, newComment)}>Add Comment</button>
      <div>{renderComments(comments)}</div>
    </div>
  );
};

export default NestedComments;
