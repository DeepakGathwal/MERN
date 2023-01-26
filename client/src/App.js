import Header from "./component/Header";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./component/Login";
import SingUp from "./component/SingUp";
import Welcome from "./component/Welcome";
import { useSelector } from "react-redux";
function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
  <>
  <Router>
  <Header/>
 <main>
 <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/singUp" element={<SingUp/>}/>
    <Route path="/welcome" element={<Welcome/>}/>
  </Routes>
 </main>
  </Router>
  </>

  );
}

export default App;
