import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import './profile.css'
import ip from "./config";

function Profile()
{
    const [name,setname]=useState(null);
    const details=useSelector((e)=>e.objects.items[1])
    const [data,setdata]=useState(null);
    let navigate=useNavigate();
    let dispatch=useDispatch();
    const send=async (e)=>{
        e.preventDefault();
        console.log(details.id)
        try {
            const response= await fetch(`${ip}/edit/${details.id}`,{
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(name)
            })
            if(response.status==200){
                alert("Updated successfully,log in again")
                setdata({name:name,id:details.id,email:details.email,phonenumber:details.phonenumber})
                dispatch({type:"remove objects",payload:1})
                dispatch({type:"Add objects",payload:{id:1,data:data}})
                navigate('/')
            }
        } catch (error) {
            console.log("Error",error)
        }

    }
    const navi=(e)=>{
        e.preventDefault();
        navigate('/password')
    }
    const logout=()=>{
      navigate('/')
      dispatch({type:"remove objects",payload:1})
    }
    if(details!=null){
    return(<>
        <h2 className="wel" >Welcome To Profile,{details.name}</h2>
        <div className="for-container">
            <form onSubmit={send}>
              <p>
                <label> Name: </label>
                <input
                  className="for-input"
                  type="text"
                  placeholder={details.name}
                  required
                  onChange={(e) => setname({  name: e.target.value })}
                />
              </p>
              <p>
                <label> Email: </label>
                <input
                  className="for-input"
                  type="text"
                  value={details.email}
                  required
                  
                />
              </p>
              <p>
                <label> Phone number: </label>
                <input
                  className="for-input"
                  type="text"
                  value={details.phonenumber}
                  required
                  
                />
              </p>
              <div className="butt">
                <button className="for-button" type="submit">update</button>
                <button className="for-button" onClick={navi} >change password</button>
              </div>
            </form>
          </div>
          <div className="logout"><button  onClick={logout}>Log out</button></div></>)
    }
    
}
export default Profile;