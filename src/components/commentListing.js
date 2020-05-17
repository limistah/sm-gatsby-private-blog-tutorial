import React from "react"

function commentListing({ comments }) {
  return (
    <ul style={{ listStyleType: "none", margin: "20px 40px" }}>
      {comments &&
        comments.map(comment => {
          return (
            <li>
              <div>
                <strong>{comment.name}</strong> at{" "}
                {new Date(comment.updatedAt).toLocaleDateString()}:
              </div>
              <div>{comment.content}</div>
              <hr />
            </li>
          )
        })}
    </ul>
  )
}

export default commentListing
