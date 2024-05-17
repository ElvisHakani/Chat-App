import '../styles/LogInComponent.css'
import icon1 from '../assets/icon1.jpg'
import icon2 from '../assets/icon2.jpg'
import icon3 from '../assets/icon3.jpg'
import icon4 from '../assets/icon4.jpg'
import icon5 from '../assets/icon5.jpg'
import icon6 from '../assets/icon6.jpg'
import icon7 from '../assets/icon7.jpg'
import icon8 from '../assets/icon8.jpg'
import icon9 from '../assets/icon9.jpg'
import { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext'
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/UseFetch'

function LogInComponent() {
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserContext)
  const {data: Users} = useFetch('https://66421a1d3d66a67b34363c83.mockapi.io/users')
  const [registerd, setRegisterd] = useState(false)
  const [coppyUser, setCoppyUser] = useState({
    name: '',
    password: '',
    avatar: ''
  })
  
  const handleChange = (event) => {
    const {name, value} = event.target
    setCoppyUser((prevUserData) => ({
      ...prevUserData,
      [name] : value
    }))
  }

  useEffect(() => {
    if (Users) {
      const user = Users.find(x => coppyUser.name === x.name)
      if (user) {
        setRegisterd(true)
      } else setRegisterd(false)
    }
  }, [coppyUser])


  const handleSubmit = (event) => {
    event.preventDefault()
    setUser({
      name: coppyUser.name,
      password: coppyUser.password,
      avatar: coppyUser.avatar
    })
    if (registerd) {
      alert('This username is already registerd')
    } else {
      if (coppyUser.avatar) {
        fetch('https://66421a1d3d66a67b34363c83.mockapi.io/users', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(coppyUser)
        })
        navigate('/chat')
      } else {
        alert('Please select an avatar')
      }
    }
  }

  return (
    <div className='login'>
      <div className="container">
        <h1 className='heading'>Welcome</h1>
        <form onSubmit={handleSubmit} className='form'>
          <div className='width'>
            <p className='label'>Chose a username</p>
            <input type='text' className='input' name='name' onChange={handleChange} required/>
            {registerd && <p className='err'>Already registered, please choose other username</p>}
          </div>
          <div className='width'>
            <p className='label'>Chose a password</p>
            <input type='password' className='input' name='password' onChange={handleChange} required/>
          </div>
          <div>
            <p className='label'>Chose an avatar</p>
            <div className='logos'>
              <div className='avatar'>
                {coppyUser.avatar === icon1 && <i className="pi pi-check check" style={{ fontSize: '2rem', color: 'lightGreen', zIndex: '3', fontWeight: '2000' }}></i>}
              <img src={icon1} className='image' onClick={() => setCoppyUser(prevUser => ({...prevUser, avatar: icon1}))}></img>
              </div>
              <div className='avatar'>
                {coppyUser.avatar === icon2 && <i className="pi pi-check check" style={{ fontSize: '2rem', color: 'lightGreen', zIndex: '3', fontWeight: '2000' }}></i>}
              <img src={icon2} className='image' onClick={() => setCoppyUser(prevUser => ({...prevUser, avatar: icon2}))}></img>
              </div>
              <div className='avatar'>
                {coppyUser.avatar === icon3 && <i className="pi pi-check check" style={{ fontSize: '2rem', color: 'lightGreen', zIndex: '3', fontWeight: '2000' }}></i>}
              <img src={icon3} className='image' onClick={() => setCoppyUser(prevUser => ({...prevUser, avatar: icon3}))}></img>
              </div>
              <div className='avatar'>
                {coppyUser.avatar === icon4 && <i className="pi pi-check check" style={{ fontSize: '2rem', color: 'lightGreen', zIndex: '3', fontWeight: '2000' }}></i>}
              <img src={icon4} className='image' onClick={() => setCoppyUser(prevUser => ({...prevUser, avatar: icon4}))}></img>
              </div>
              <div className='avatar'>
                {coppyUser.avatar === icon5 && <i className="pi pi-check check" style={{ fontSize: '2rem', color: 'lightGreen', zIndex: '3', fontWeight: '2000' }}></i>}
              <img src={icon5} className='image' onClick={() => setCoppyUser(prevUser => ({...prevUser, avatar: icon5}))}></img>
              </div>
              <div className='avatar'>
                {coppyUser.avatar === icon6 && <i className="pi pi-check check" style={{ fontSize: '2rem', color: 'lightGreen', zIndex: '3', fontWeight: '2000' }}></i>}
              <img src={icon6} className='image' onClick={() => setCoppyUser(prevUser => ({...prevUser, avatar: icon6}))}></img>
              </div>
              <div className='avatar'>
                {coppyUser.avatar === icon7 && <i className="pi pi-check check" style={{ fontSize: '2rem', color: 'lightGreen', zIndex: '3', fontWeight: '2000' }}></i>}
              <img src={icon7} className='image' onClick={() => setCoppyUser(prevUser => ({...prevUser, avatar: icon7}))}></img>
              </div>
              <div className='avatar'>
                {coppyUser.avatar === icon8 && <i className="pi pi-check check" style={{ fontSize: '2rem', color: 'lightGreen', zIndex: '3', fontWeight: '2000' }}></i>}
              <img src={icon8} className='image' onClick={() => setCoppyUser(prevUser => ({...prevUser, avatar: icon8}))}></img>
              </div>
              <div className='avatar'>
                {coppyUser.avatar === icon9 && <i className="pi pi-check check" style={{ fontSize: '2rem', color: 'lightGreen', zIndex: '3', fontWeight: '2000' }}></i>}
              <img src={icon9} className='image' onClick={() => setCoppyUser(prevUser => ({...prevUser, avatar: icon9}))}></img>
              </div>
            </div>
          </div>
          <input type='submit' value='Continue to chat' className='button'></input>
        </form>
        <div className='reg-div'>
          <p className='reg'>Already Registered?</p>
          <button onClick={() => navigate('/register')} className='reg-btn'>Register</button>
        </div>
      </div>
    </div>
)
}
export default LogInComponent