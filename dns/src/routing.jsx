import Home from'./home'
import Graph from './graph'
import Profile from './Profile'
import Edit from './edit'
import App from './App'
import Password from './password'
import './login.css'
import {BrowserRouter,Route,Routes,Link} from'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import Add from './add'


function Routing(){
    const [s,sets]=useState(false);
const c=useSelector(state=>state.objects.items[1]);
useEffect(() => {
    if (c != null) {
      sets(true);
    } else {
      sets(false); 
    }
  }, [c]);
 return(
    <BrowserRouter>
  <nav className="navstyle">
  {(s)?(<><div className='navbarpos'>
    <Link to="/home" className="lin" >Home</Link>
    <Link to="/Graph" className="lin">Dashboard</Link>
    </div>
    <div className='lo'>
      <Link to="/profile" className="login">Profile</Link>
    </div></>):(<><div className='navbarpos'>
    <Link  className="lin" onClick={()=>{alert("please Sign in")}}>Home</Link>
    <Link  className="lin"onClick={()=>{alert("please Sign in")}}>Dashboard</Link>
    </div></>)}
  </nav>

  <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Graph" element={<Graph />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/add" element={<Add />} />
      <Route path="/password" element={<Password />} />
  </Routes>
</BrowserRouter>
  

 )
}

export default Routing;