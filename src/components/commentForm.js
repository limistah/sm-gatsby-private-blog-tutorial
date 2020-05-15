import React, { useRef, useCallback, useState } from "react"

const inputStyle = {
  width: "100%",
  padding: "8px",
}

function usePostComment({ slug, websiteURL }) {
  const nameRef = useRef()
  const contentRef = useRef()

  const [errorMessage, setError] = useState("")
  const [saveMessage, setSaveMessage] = useState("")

  const handleSubmit = useCallback(
    e => {
      setError("")
      setSaveMessage("")
      e.preventDefault()
      const name = nameRef.current.value
      const content = contentRef.current.value
      if (!name) {
        setError("Name is not required")
        return
      }
      if (!content) {
        setError("Comment is required")
        return
      }
      setSaveMessage("Saving comment")
      const data = {
        website: websiteURL || "https://private-blog.netlifyapp.com",
        slug: slug || "/empty-slug",
        name,
        content,
      }
      fetch(
        "https://cors-anywhere.herokuapp.com/gatsbyjs-comment-server.herokuapp.com/comments",
        {
          body: JSON.stringify(data),
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ).then(async res => {
        const json = await res.json()
        setSaveMessage("")
        if (!res.ok) {
          setError(json.error.msg)
        }
        setSaveMessage("Comment saved. Thank you!")
        nameRef.current.value = ""
        contentRef.current.value = ""
        fetch("/__refresh")
      })
    },
    [slug, websiteURL]
  )

  return { handleSubmit, nameRef, contentRef, errorMessage, saveMessage }
}

function CommentForm({ slug, websiteURL }) {
  const {
    handleSubmit,
    nameRef,
    contentRef,
    errorMessage,
    saveMessage,
  } = usePostComment({ slug, websiteURL })
  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} style={{ ...inputStyle }} placeholder="Your Name" />
      <textarea
        ref={contentRef}
        placeholder="Comment"
        style={{ ...inputStyle }}
      ></textarea>
      {errorMessage && <div style={{ color: "tomato" }}>{errorMessage}</div>}
      {saveMessage && <div style={{ color: "violet" }}>{saveMessage}</div>}
      <button type="submit">Submit</button>
    </form>
  )
}

export default CommentForm
