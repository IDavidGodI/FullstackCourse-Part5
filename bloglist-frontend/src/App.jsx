import { useState, useEffect } from 'react'
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

      return true;

    }catch(e){
      setMessage({ text: e.response.data.error, success: false})
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      return false;
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
        setBlogs( blogs )  
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

      <Toggeable buttonLabel="Add a blog">
        <BlogForm createBlog={createBlog}/>
      </Toggeable> 

      {
        blogs && 
        blogs.length>0?
        <>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
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