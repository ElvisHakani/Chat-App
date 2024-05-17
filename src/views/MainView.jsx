import { useContext, useState, useRef, useEffect } from 'react'
import '../styles/MainView.css'
import { UserContext } from '../context/UserContext'
import icon1 from '../assets/icon1.jpg'
import icon2 from '../assets/icon2.jpg'
import icon3 from '../assets/icon3.jpg'
import icon4 from '../assets/icon4.jpg'
import icon5 from '../assets/icon5.jpg'
import icon6 from '../assets/icon6.jpg'
import icon7 from '../assets/icon7.jpg'
import icon8 from '../assets/icon8.jpg'
import icon9 from '../assets/icon9.jpg'
import { useNavigate } from 'react-router-dom'

const fetchData = async () => {
    try {
        const response = await fetch('https://66421a1d3d66a67b34363c83.mockapi.io/messages');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        return null;
    }
};

function MainView() {

    const {user} = useContext(UserContext)
    const [currentText, setCurrentText] = useState('')
    const message = useRef({
        text: '',
        sender: {
            name: '',
            avatar: ''
        },
        time: ''
    })
    const [data, setData] = useState(null)
    const navigate = useNavigate()
    
    const handleChange = (event) => {
        const time = new Date()
        const hours = time.getUTCHours()
        const minutes = time.getUTCMinutes()
        message.current = {
            text: event.target.value,
            sender: {
                name: user.name,
                avatar: user.avatar
            },
            time: `${hours}:${minutes}`
        }
        setCurrentText(event.target.value)
    }

    const handleSubmit = (event) => {
        if (currentText) {
            event.preventDefault()
        fetch('https://66421a1d3d66a67b34363c83.mockapi.io/messages', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(message.current)
        })
        setCurrentText('')
    } else alert('Message is empty')
    }

    const containerRef = useRef()
    const [length, setLength] = useState(0)
    useEffect(() => {
        if (data && user.name && Object.values(data).length !== length) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
            setLength(Object.values(data).length)
        }  
        if (!user.name) navigate('/')
    })
    
    useEffect(() => {
        const loadData = async () => {
            const fetchedData = await fetchData();
            setData(fetchedData);
        };
        const intervalId = setInterval(loadData, 1000);
        
        return () => clearInterval(intervalId);
    }, []);
    
return (
    <main className='main-chat'>
        <div className='chat'>
            <div className='upper-strip'>
                <h1>Welcome to the chat</h1>
            </div>
            <div className='chats' ref={containerRef}>
            {data && data.map((message, id) => (
                <div className={message.sender.name == user.name ? 'sent' : 'receved'} key={id}>
                    <div className={message.sender.name === user.name ? 'message' : ''}>
                        {message.sender.name !== user.name && <p className='sender'>{message.sender.name}</p>}
                        <p className='text'>{message.text}</p>
                        <p className='time'>{message.time}</p>
                    </div>
                    <img src={message.sender.avatar} className='profile'></img>
                </div>
            ))}
            </div>
            <form className='input-container' onSubmit={handleSubmit}>
                <input className='the-text' name='text' onChange={handleChange} value={currentText} placeholder='Type Here'/>
                <button type='submit' className='send'>Send</button>
            </form>
        </div>
    </main>
)
}
export default MainView