import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Login({isAuthenticated,setUser,setIsAuthenticated, user}) {

  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])
  function onSubmit(e){
    
      e.preventDefault()
      const currentUser = {
        username: username,
        password
      }   

      fetch(`http://localhost:3000/login`,{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(currentUser)
      })
      .then(res => {
        if(res.ok){
          res.json()
          .then(user=>{
            setUser(user)
            setIsAuthenticated(true)
            console.log("working?")
            navigate("/home")
          })
          
        } else {
          res.json()
          .then(json => setError(json.error))
        }
      })
  }
  return (
    <div className="Wrapper">
        <div>
          <h2 className="text-pink-500">Sign in to your account</h2>
          <p className="">
            Or{' '}
            <a href="/auth" className="" title="">
              create an account here!
            </a>
          </p>
        </div>
        <form className="">
          <div className="">
            <div>
              <label htmlFor="user-name" className="sr-only">
                User name
              </label>
              <input
                id="user-name"
                name="username"
                type="username"
                required
                className=""
                placeholder="User Name"
                onChange={(event) =>setUsername(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className=""
                placeholder="Password"
                onChange={(event) =>setPassword(event.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="text-sm">
              <a href="/auth" className="">
                Forgot your password?...create a new account!
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="" onClick={onSubmit}>
              <span className="">
              </span>
              Sign in
            </button>
          </div>
        </form>
        {error?<div>{error}</div>:null}
    </div>
  )
}

export default Login;