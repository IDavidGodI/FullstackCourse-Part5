import {useState} from 'react'

const LoginForm = ({ handleLogin }) => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault();

    const success = handleLogin({userName, password})

    if (success){
      setUserName('')
      setPassword('')
    }
  }

  return (
    <form onSubmit={login}>
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
}

export default LoginForm;