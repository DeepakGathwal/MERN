import React,{ useEffect,useState } from 'react'
import axios from 'axios'

const Welcome = () => {
  const [posts,setPosts] = useState()

  let firstRender = true;
  const getUser = async() => {
    const res = await axios.get("http://localhost:8080/api/user",{
      withCredentials:true
    }).catch(err => console.log(err))
    const {data} =await res
   return data;
  }
  const refreshToken = async() => {
    const res = await axios.get("http://localhost:8080/api/refresh",{
      withCredentials:true
    }).catch(err => console.log(err))
    const {data} =await res
   return data;
  }

useEffect(() =>{
//  if(firstRender){
//   firstRender = false
  getUser().then((data) => setPosts(data.user))
//  }
//   let interval = setInterval(() => {
//     refreshToken().then((data) => setPosts(data.user))
//   },1000 * 28)
//  return () => clearInterval(interval)
},[])

  return (
    <div>
   {posts ?  <h4>{posts.name.toUpperCase()}</h4>: "NavBar" }

    </div>
  )
}

export default Welcome
