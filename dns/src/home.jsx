import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Papa from 'papaparse';
import './home.css'
import ip from "./config";
function Home(){
   const [records,setrecords]=useState(null);
   const [search,setsearch]=useState("");
   const [loading, setLoading] = useState(false);
   const [det, setdet] = useState(false);
   const [dele,setdele] =useState(null);
   const [typeOptions, setTypeOptions] = useState([]);
   const [filterType, setFilterType] = useState( );
   let navigate=useNavigate();
   let dispatch=useDispatch();
   const details=useSelector(e=>e.objects.items[1]);
   

    useEffect(() => {
        if (records) {
          const uniqueTypes = new Set();
          records.forEach(record => {
            if (record.Type) {
                uniqueTypes.add(record.Type);
            }
        });
        setTypeOptions([...uniqueTypes]);
      }
    }, [records]);
  

   useEffect(()=>{
     const fetchdata= async()=>{
        if(details!=null){
            setLoading(true);
            setrecords(null);
            try {
                const response= await fetch(`${ip}/dns`)
            const jsonData= await response.json();
            setrecords(jsonData);
            console.log(records)
            } catch (error) {
                console.log("Error in Fetching data : ",error)
            }
            
        }
     }
     fetchdata()
   },[details,det])
   useEffect(()=>{
    const fetchdata= async()=>{
       if(dele!=null){
           try {
               const response= await fetch(`${ip}/dns`,{
                method: 'DELETE', 
                headers: {
                        'Content-Type': 'application/json'
                        },
                body: JSON.stringify(dele)
               })
           const jsonData= await response.json();
            alert("Deleted sucessfuly,reolding")
           setdet(true) 
           
           } catch (error) {
               console.log("Error in Fetching data : ",error)
           }
           
       }
    }
    fetchdata()
  },[dele])
  const filteredRecords = records?.filter(record =>
    record?.Name?.toLowerCase().includes(search.toLowerCase()) &&
    (filterType ? record.Type === filterType : true)
);
   const edited=async (name,type,ttl,resourceRecords)=>{
    const update= await{
        Name:name,
        Type:type,
        TTL:ttl,
        ResourceRecords:resourceRecords
    }
    dispatch({ type: "Add objects", payload: { id: 2, data: update } });
    
      navigate(`/edit`)
   }
   function del(name,type,ttl,resourceRecords){
        setdele({
            Name:name,
            Type:type,
            TTL:ttl,
            ResourceRecords:resourceRecords
        })
   }

   function Row({name,type,ttl,resourceRecords}){
    const [toogle, settoogle] = useState(false);
    const toggleVisibility = () => {
        settoogle(!toogle);
      };
    return(
        <>
        <tr >
           <td>{name}</td>
           <td>{type}</td>
           <td>{ttl}</td>
           <td>
           {resourceRecords && Array.isArray(resourceRecords) ? (
          resourceRecords.map((record, index) => <span key={index}>{record.Value},</span>)
        ) : (
          "No records"
        )}
      </td>
      <div onClick={()=>{toggleVisibility()}} className="toogle"><i className="fas fa-ellipsis-v" id="toog" ></i></div>
      {toogle ? (<><div className="editing-menu"><div className="toogle-edit" onClick={()=>edited(name,type,ttl,resourceRecords)}>edit</div><div className="toogle-delete " onClick={()=>del(name,type,ttl,resourceRecords)}>delete</div></div></>):(<div className="editing">false</div>)}
        </tr>
        
        </>
    )
   }
   if(records!=null){
    return((<><div className="home" >
        <div className="data-navi">
        <form className="search-from">
           <div className="search-container">
            <input type="text" placeholder="Search using Name and Type..." onChange={(e) => setsearch(e.target.value)} />
            <div className="selectop"><select onChange={(e) => {setFilterType(e.target.value), console.log(filterType)}} className="filter-select">
            <option value="">None</option>
                {typeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
        </select></div>
          </div>
        </form>
        <div className="addrecord"><button onClick={()=>navigate('/add')}>Add</button></div>
        </div>

        <div className="tableov">
            <table>
                <tr>
                    <th>Name of the domain</th>
                    <th>Type</th>
                    <th>TTL</th>
                    <th>Value</th>
                </tr>
                {filteredRecords.map((item, index) => (
                    <Row 
                     key={`${item.Name}-${item.Type}-${item.TTL}-${index}`} 
                     name={item.Name} 
                     type={item.Type}
                     ttl={item.TTL} 
                     resourceRecords={item.ResourceRecords}
                     
                    />
                ))}
            </table>
        </div>
    </div></>))
   }
   if (loading) {
    return <div>Loading...</div>; 
  }
   if(!records){
    return(<div>Error In Loading Page</div>)
   }
}

export default Home;