import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault();

    try{
      const user = await loginService.login({userName, password})

      window.localStorage.setItem("BlogListUser", JSON.stringify(user))

      setUser(user)
      setUserName('')
      setPassword('')

    }catch(e){
      setMessage({ text: "Wrong credentials", success: false})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () =>{
    window.localStorage.removeItem("BlogListUser");
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll()
      .then(blogs =>{
        console.log(blogs)
        setBlogs( blogs )  
      })  
  }, [])

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem("BlogListUser");
    if (loggedUserJSON){
      const loggedUser = JSON.parse(loggedUserJSON);

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

  const blogsDisplay = ()=>(
    <div>
      <h2>blogs</h2>
      <p style={{fontSize: "18px"}}><b>{ user.name }</b> logged in</p>
      <button onClick={handleLogOut}>log out</button>
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
          succes = { message.succes }
        />
      }
      { !user && loginForm()}
      { user && blogsDisplay()}
    </>
  )
}

export default App