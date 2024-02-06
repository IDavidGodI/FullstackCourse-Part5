import { useState } from "react"

const Blog = ({ blog, addLike, removeBlog, user }) => {

  const blogStyle = {
    margin: "10px 0",
    padding: "5px 20px",
    border: "1px dashed black"
  }

  const [viewDetails, setViewDetails] = useState(false)

  const toggleDetails = () => {
    setViewDetails(!viewDetails)
  }

  return (
    <div className="blog" style={blogStyle}>
      <p>{blog.title} {blog.author} <button className="likeButton" onClick={toggleDetails}>{viewDetails ? "hide" : "view"}</button></p>
      {
        viewDetails &&
        <>
          <a href={blog.url}>{blog.url}</a>
          <p>{blog.likes} likes <button onClick = { () => addLike(blog)}>like</button></p>
          <p>Added by <b>{blog.user.name}</b></p>
          {user.username === blog.user.userName && <button onClick = { () => removeBlog(blog)}>Delete blog</button>}
        </>
      }

    </div>
  )
}
export default Blog