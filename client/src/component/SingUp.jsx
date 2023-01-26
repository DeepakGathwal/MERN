import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const SingUp = () => {
  const navigate = useNavigate()
  const [inputs,setInput] = useState({
    name:"",
    email:"",
    password:"",
  })
const sendRequest = async() => {
  const res = await axios.post("http://localhost:8080/api/",{
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
    sendRequest().then(() => navigate("/login"))
    
  }
  return (
    <div>
     <form onSubmit={userData}>
     <input
     onChange={handelChange}
     name="name"
      type="text"
      placeholder="Enter Your Name"
      value={inputs.name}
      />
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
      <input type="submit" value="SignUp"/>
     </form>
    </div>
  )
}

export default SingUp
