import {useState} from "react"

const Blog = ({ blog }) =>{ 
  
  // const blogStyle = 

  const [viewDetails, setViewDetails] = useState(false);


  const toggleDetails = () => {
    setViewDetails(!viewDetails)
  }

  return (
    <div style={{
      margin: "10px 0",
      padding: "0.1px 20px",
      border: "1px dashed black"
    }}>
      <p>{blog.title} {blog.author} <button onClick={toggleDetails}>{viewDetails? "hide" : "view"}</button></p>
      {
        viewDetails &&
        <>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button>like</button></p>
          <p>Added by <b>{blog.user.name}</b></p>
        </>
      }

    </div>  
  )
}
export default Blog