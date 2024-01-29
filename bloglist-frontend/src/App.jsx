import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Toggeable from './components/Toggeable'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault();

    try{
      const newUser = await loginService.login({userName, password})

      window.localStorage.setItem("BlogListUser", JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      setUser(newUser)
      setUserName('')
      setPassword('')

    }catch(e){
      setMessage({ text: "Wrong credentials", success: false})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleNewBlog = async (event) =>{
    event.preventDefault();

    try{
      const addedBlog = await blogService.create({
        title, author, url
      })

      setTitle('')
      setAuthor('')
      setUrl('')

      setBlogs(blogs.concat(addedBlog))
      setMessage({ text: "New blog added!", success: true})
      setTimeout(() => {
        setMessage(null)
      }, 5000)

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username: <input 
          type="text" name="userName" placeholder="username"
          value={ userName }
          onChange = { ({target}) => setUserName(target.value) }
        />
      </div>
      <div>
        Password: <input 
          type="password" name="password" placeholder="password"
          value={ password }
          onChange = { ({target}) => setPassword(target.value) }
        />
      </div>
      <button type="submit">log in</button>
    </form>
  )

  const newBlogForm = ()=>(
    <div>
      <h2>New blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <input 
            type="text" name="title" placeholder="TITLE"
            value={ title }
            onChange = { ({target}) => setTitle(target.value) }
          />
        </div>
        <div>
          <input 
            type="text" name="author" placeholder="AUTHOR"
            value={ author }
            onChange = { ({target}) => setAuthor(target.value) }
          />
        </div>
        <div>
          <input 
            type="text" name="url" placeholder="URL"
            value={ url }
            onChange = { ({target}) => setUrl(target.value) }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  const blogsDisplay = ()=>(
    <div>
      <h2>blogs</h2>
      <p style={{fontSize: "18px"}}><b>{ user.name }</b> logged in <button onClick={handleLogOut}>log out</button></p>

      <Toggeable buttonLabel="Add a blog">
        { newBlogForm() }
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
      { !user && loginForm()}
      { user && blogsDisplay()}
    </>
  )
}

export default App