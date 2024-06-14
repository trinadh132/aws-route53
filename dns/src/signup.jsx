import { useState,useEffect } from "react";
import'./login.css';
import axios from "axios";
import ip from "./config";

function Signup(props)
{
    const [cp,setcp]=useState();
    const [log,setlog]=useState({
        name: null,
        email: null,
        phonenumber: null,
        password: null,
    });
    const id=1;

    const send=(e)=>{
        e.preventDefault();
        if(cp===log.password){
           const postdata =async()=>{
           try {
            const res= await axios.post(`${ip}/details`,log)
            props.onToggle(); 
            console.log(res.data)
           } catch (error) {
             console.log("An error occures",error)
           }
           
        }
        postdata();
    }
    else{
        alert("your password did not match");
    }
}

    return(<>
    <div className="form-container">
        <form onSubmit={send}>
          <p>
            <label> Name: </label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter your legal name"
              required
              onChange={(e) => setlog({ ...log, name: e.target.value })}
            />
          </p>
          <p>
            <label> Email: </label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter your personal email"
              required
              onChange={(e) => setlog({ ...log, email: e.target.value })}
            />
          </p>
          <p>
            <label> Phone number: </label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter your phone number"
              required
              onChange={(e) => setlog({ ...log, phonenumber: e.target.value })}
            />
          </p>
          <p>
   <label> Password: <span style={{color: 'red'}}>*</span></label>
  <input
    className="form-input"
    type="password"
    placeholder="Enter password"
    required
    pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[@#$%^&*]).+$"
    title="Password must contain at least one number and one symbol and one uppercase."
    onChange={(e) => setlog({ ...log, password: e.target.value })}
  />
</p>

          <p>
            <label> Confirm Password: </label>
            <input
              className="form-input"
              type="password"
              placeholder="Re-enter password"
              required
              onChange={(e) => { setcp(e.target.value)}}
            />
          </p>
          <div>
            <button className="form-button" type="submit">Signup</button>
          </div>
        </form>
      </div></>)
}

export default Signup;