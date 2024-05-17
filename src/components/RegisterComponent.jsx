import { useContext, useState } from "react"
import useFetch from "../hooks/UseFetch"
import { UserContext } from "../context/UserContext"
import '../styles/RegisterComponent.css'
import { Navigate, useNavigate } from "react-router-dom"

function RegisterComponent() {
    const navigate = useNavigate()
    const {data: Users} = useFetch('https://66421a1d3d66a67b34363c83.mockapi.io/users')
    const {user, setUser} = useContext(UserContext)
    const [notFound, setNotFound] = useState(false)
    const [name, setName] = useState('')
    const [password, setPassword] = useState()

    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        if (name === 'name') setName(value)
        if (name === 'password') setPassword(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (Users) {
            const user = Users.find(x => name === x.name)
            if (user && user.password === password) {
                navigate('/chat')
                setUser(user)
            } else {
                setNotFound(true)
            }
        }
    }


  return (
    <div className="main-register">
        <div className="container">
        <h1 className='heading'>Register</h1>
        <form onSubmit={handleSubmit} className='form'>
          <div className="width">
            <p className='label'>Enter your username</p>
            <input type='text' className='input' name='name' onChange={handleChange} required/>
          </div>
          <div className="width">
            <p className='label'>Enter your password</p>
            <input type='password' className='input' name='password' onChange={handleChange} required/>
          </div>
            {notFound && <p className="err">Incorrect Credentials</p>}
          <input type='submit' value='Continue to chat' className='button sub'></input>
        </form>
        <div className="reg-div">
          <p className="reg">Not Registered Yet?</p>
          <button className="reg-btn" onClick={() => navigate('/')}>Log In</button>
        </div>
      </div>
    </div>
  )
}
export default RegisterComponent