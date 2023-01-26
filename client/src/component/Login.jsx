import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [inputs,setInput] = useState({
    email:"",
    password:"",
  })
const sendRequest = async() => {
  const res = await axios.post("http://localhost:8080/api/login",{
    name:inputs.name,
    email:inputs.email,
    password:inputs.password
  }).catch((err) =>   console.log(err));
  const data = await res.data;
  console.log(data);
  return data;
}

  const handelChange = (e) => {
    setInput((prev) => ({...prev,[e.target.name]:e.target.value}))
  }
  const userData = (e) => {
    e.preventDefault()
    sendRequest().then(() => navigate("/welcome"))
    
  }
  return (
    <div>
     <form onSubmit={userData}>
      <input
      onChange={handelChange}
      type="email"
      placeholder="Enter your Email"
      name="email"
      value={inputs.email}
      />
      <input
      onChange={handelChange}
      type="password"
      placeholder="Enter your Password"
      name="password"
      value={inputs.password}
      />
      <input type="submit" value="LogIn"/>
     </form>
    </div>
  )
}

export default Login
