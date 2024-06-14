import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Papa from 'papaparse';
import "./add.css"
import ip from "./config";

function Add(){
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const [fileName, setFileName] = useState("");
    const [log,setlog]=useState();
    let navigate=useNavigate();
    const postData= async (data)=>{
        try {
            const response= await fetch(`${ip}/adddns`,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
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
        const result=await postData(log);
        if(result.status==200){
            alert("Created successfully,Redirecting to Home Page")
            setTimeout(navigate('/home'),5000)
        }else{
            alert("error occured while adding check your value entered",result.error)
        }
    }
    const handleFileChange = (event) => {
      setData(null);
      const selectedFile = event.target.files[0];
      if (selectedFile) {
          setFile(selectedFile);
          setFileName(selectedFile.name); 
      } else {
          setFileName(""); 
      }
      };
    const handleReadFile = () => {
      if (!file) return;

      const fileExtension = file.name.split('.').pop();

      if (fileExtension === "csv") {
        Papa.parse(file, {
            complete: (result) => {
                setData(result.data);
            },
            header: true
        });
      } else if (fileExtension === "json") {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const jsonObj = JSON.parse(event.target.result);
                console.log('Parsed JSON Data:', jsonObj);
                setData(jsonObj);
            } catch (e) {
                console.error('Error parsing JSON:', e);
                setData(`Failed to parse JSON: ${e.message}`);
            }
        };
        reader.readAsText(file);
      } else {
        setData('Unsupported file type. Please upload a CSV or JSON file.');
    }
};
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
    const handleSubmitData = async () => {
      for (const item of data) {
          const response = await postData(item);
          if (!response || response.status !== 200) {
              alert("Error occurred while updating. Check your data entered.");
              return;
          }
      }
      alert("All items created successfully, Redirecting to Home Page");
      setTimeout(() => navigate('/home'), 5000);
  };
    
    return((<>
      <div className="container">
        <div className="form-containe">
            <form onSubmit={send}>
              <p>
                <label> Name: </label>
                <input
                  className="form-inpu"
                  type="text"
                  name="Name"
                  placeholder="Enter Name of the Record end with .task1.com"
                  required
                  onChange={handleChange}
                />
              </p>
              <p>
                <label> Type: </label>
                <input
                  className="form-inpu"
                  type="text"
                  name="Type"
                  placeholder="enter type of the record"
                  required
                  onChange={handleChange}
                />
              </p>
              <p>
                <label> TTL: </label>
                <input
                  className="form-inpu"
                  type="text"
                  name="TTL"
                  placeholder="enter the time"
                  required
                  onChange={handleChange}
                />
              </p>
              <p>
       <label> Values: </label>
      <input
        className="form-inpu"
        type="text"
        placeholder="enter values with comma separated"
        name="ResourceRecords"
        required
        onChange={handlevalues}
      />
    </p>
              <div>
                <button className="form-butto" type="submit">Create</button>
              </div>
            </form>
          </div> <h3 className="h3">or</h3><div className="file">
            <div className="file-input-container">
            <input type="file" accept=".csv,.json" onChange={handleFileChange} className="file-input" />
            {fileName && <span className="file-name">{fileName}</span>}</div>
            <button onClick={handleReadFile}className="read-button" >Read File</button>
            <div  className="file-display">
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>{(data!=null) && (
                    <button onClick={handleSubmitData} className="upload-button">Upload Data</button>
                )}
        </div></div></>))
}
export default Add;