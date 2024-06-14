import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "./edit.css"
import ip from "./config";

function Edit(){

    const [log,setlog]=useState();
    let navigate=useNavigate();
    let dispatch=useDispatch();
    const data= useSelector(e=>e.objects.items[2]);
    const postData= async ()=>{
        try {
            const body= {oldrecord:data,newRecord:log}
            const response= await fetch(`${ip}/dns`,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`); 
            }
            
            
            return {status: response.status, data: responseData};
        } catch (error) {
            console.log("error",error)
            return {status: 500, error: error.message};
        }
    }
    const send=async (e)=>{
        e.preventDefault();
        const result=await postData();
        if(result.status==200){
            dispatch({type:"remove objects",payload:{id:2}})
            alert("update successfully,Redirecting to Home Page")
            setTimeout(navigate('/home'),5000)
        }else{
            alert("error occured while updating check your value entered",result.error)
        }
    }
    function handleChange(e) {
       
        setlog(prevLog => ({
            ...prevLog,
            [e.target.name]: e.target.value
        }));
    }
    function handlevalues(e) {
    const inputValue=e.target.value
    const newRecords = inputValue.split(',')
        .map(item => item.trim())
        .filter(item => item) 
        .map(value => ({ Value: value }));  
        setlog(prevLog => ({
            ...prevLog,
            [e.target.name]: newRecords
        }));
        
    }
    if(data!=null){
    return((<>
        <div className="form-container">
            <form onSubmit={send}>
              <p>
                <label> Name: </label>
                <input
                  className="form-input"
                  type="text"
                  name="Name"
                  placeholder={data.Name}
                  required
                  onChange={handleChange}
                />
              </p>
              <p>
                <label> Type: </label>
                <input
                  className="form-input"
                  type="text"
                  name="Type"
                  placeholder={data.Type}
                  required
                  onChange={handleChange}
                />
              </p>
              <p>
                <label> TTL: </label>
                <input
                  className="form-input"
                  type="text"
                  name="TTL"
                  placeholder={data.TTL}
                  required
                  onChange={handleChange}
                />
              </p>
              <p>
       <label> Values: </label>
      <input
        className="form-input"
        type="text"
        name="ResourceRecords"
        required
        onChange={handlevalues}
      />
    </p>
              <div>
                <button className="form-button" type="submit">Update</button>
              </div>
            </form>
          </div></>))}
          else{
            return(<h1>error</h1>)
          }
}

export default Edit;