import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import './password.css'
import ip from "./config";

function Password(){
    const [name,setname]=useState({});
    const details=useSelector((e)=>e.objects.items[1])
    let navigate=useNavigate();
    const send=async (e)=>{
        e.preventDefault();
        if((name.new==name.newcon)&&(name.old==(details.password.toString()))){
            console.log(name.new)
        try {
            const response= await fetch(`${ip}/editp/${details.id}`,{
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({new:name.new})
            })
            if(response.status==200){
                alert("Updated password successfully,please log in again")
                navigate('/')
            }
        } catch (error) {
            console.log("Error",error)
        }}
        else{
            console.log(details)
            alert("Check your old password or confirm password")
        }

    }
    if(details!=null){
    return(<>
        <h2 className="h2" >Changing Password  for username {details.name}</h2>
        <div className="fo-container">
            <form onSubmit={send}>
              <p>
                <label> Old Password: </label>
                <input
                  className="fo-input"
                  type="password"
                  placeholder="enter old password"
                  required
                  onChange={(e) => setname({  ...name,old: e.target.value })}
                />
              </p>
              <p>
                <label> New Password: </label>
                <input
                  className="fo-input"
                  type="password"
                  placeholder="enetr new password"
                  pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[@#$%^&*]).+$"
                  title="Password must contain at least one number and one symbol and one uppercase."
                  onChange={(e) => setname({  ...name,new: e.target.value })}
                  required
                  
                />
              </p>
              <p>
                <label> Confirm New Password: </label>
                <input
                  className="fo-input"
                  type="password"
                  placeholder="confirm new password"
                  pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[@#$%^&*]).+$"
                  title="Password must contain at least one number and one symbol and one uppercase."
                  onChange={(e) => setname({  ...name,newcon: e.target.value })}
                  required
                  
                />
              </p>
              <div className="butt">
                <button className="fo-button" type="submit">update password</button>
              </div>
            </form>
          </div></>)
    }

}

export default Password;