import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Toggeable from './components/Toggeable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  
  const [message, setMessage] = useState(null)


  const BlogFormRef = useRef();
  
  const sortBlogsByLikes = (blogs) => {
    return blogs.sort((b1,b2) => b2.likes-b1.likes)
  }
  const handleLogin = async (loginInfo) => {
    try{
      const newUser = await loginService.login(loginInfo)

      window.localStorage.setItem("BlogListUser", JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      setUser(newUser)

      return true;
    }catch(e){
      setMessage({ text: "Wrong credentials", success: false})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return false;
    }
  }

  const createBlog = async (blogObject) =>{

    try{
      console.log(blogObject)
      const addedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(addedBlog))
      setMessage({ text: "New blog added!", success: true})
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      BlogFormRef.current.toggleVisible();
      return true;

    }catch(e){
      setMessage({ text: e.response.data.error, success: false})
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      return false;
    }

  }

  const addLike = async (blog) => {
    try{
      const likes = blog.likes + 1;
      const updatedBlog = await blogService.update(blog.id, {likes})
      
      setMessage({ text: "Blog liked", success: true})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      
      setBlogs(sortBlogsByLikes(blogs.map(b => b.id===blog.id? updatedBlog : b)))

    }catch(e){
      setMessage({ text: e.response.data.error, success: false})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (blog) => {
    try{
      await blogService.remove(blog.id)
      
      setMessage({ text: "Blog deleted", success: true})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setBlogs(blogs.filter(b => b.id!==blog.id))

    }catch(e){
      setMessage({ text: e.response.data.error, success: false})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const handleLogOut = () =>{
    window.localStorage.removeItem("BlogListUser");
    setUser(null)
    blogService.setToken(null)
  }

  useEffect(() => {
    blogService.getAll()
      .then(blogs =>{
        setBlogs( sortBlogsByLikes(blogs) )  
      })  
  }, [])

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem("BlogListUser");
    if (loggedUserJSON){
      const loggedUser = JSON.parse(loggedUserJSON);
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
    } 
  }, [])

  const blogsDisplay = ()=>(
    <div>
      <h2>blogs</h2>
      <p style={{fontSize: "18px"}}><b>{ user.name }</b> logged in <button onClick={handleLogOut}>log out</button></p>

      <Toggeable buttonLabel="Add a blog" ref={BlogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Toggeable> 

      {
        blogs && 
        blogs.length>0?
        <>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user}/>)}
        </>
        :
        <p>You don't have any blog</p>
      }
    </div>
  )
  
  return (
    <>
      {
        message && 
        <Message
          text={ message.text }
          success = { message.success }
        />
      }
      { !user && <LoginForm handleLogin={handleLogin}/>}
      { user && blogsDisplay()}
    </>
  )
}

export default App