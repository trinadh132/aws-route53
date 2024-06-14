import { useState,useEffect } from "react";
import './login.css';
import Signup from "./signup";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "./firebase.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import ip from "./config";
function App()
{
  let navigate = useNavigate();
    const [check,setch]=useState({
        username: null,
        password: null,

    });
    const [sh,setsh]=useState(true)
    const [use , setuse]=useState(null);
    const [userDataFetched, setUserDataFetched] = useState(false);
  const dispatch=useDispatch();

  const auth = getAuth();
  let provider= new GoogleAuthProvider();

useEffect(() => {
    const fetchdata = async () => {
      if (check.username ) { 
        try {
          const response = await fetch(`${ip}/details/${check.username}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const jsondata = await response.json();
          if(jsondata.length != 0){
          setuse(jsondata[0]);
          }
          else{
            setuse('abc')
          }
          setUserDataFetched(true);
        } catch (error) {
          console.error('Error fetching user data:', error);
          
        }
      }
    };  
    fetchdata();
  }, [check]);

const getandcheck=(e)=>{
    e.preventDefault();
    if(userDataFetched && (use!=null)){
    if(use === 'abc'){
      alert("There is no username "+`${check.username}`+ " Please Sign up")
    }else {
    if((String(check.password)==String(use.password))){
      navigate(`/home`)
          dispatch({
            type:'Add objects',
          payload:{id:1,data:use}})
    }
    else{
        alert("your password or username inncorrect");
    }
  }}
  

}
const gmail =(e)=>{
  e.preventDefault();
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    navigate(`/home`)
    dispatch({
      type:'Add objects',
    payload:{id:1,data:use}})
    console.log(token)
    console.log(user)
  }).catch((error) => {
    const errorCode = error.code;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);

  });
}
const changesh = () => {
  setsh(false);

  
};
    return(<>
<div className="form-main">
  <div className="form-text">
    <h2 > Welcome to Our DNS Manager</h2>
    <h4>Efficiently Manage Your Domain Settings</h4>
    <p className="p">Start managing your domain settings effectively
       today and ensure your website's connectivity and performance are optimized.
       If you have any questions or require assistance,
       please do not hesitate to contact our support team.</p>
  </div>
  <div className="form-dfrom">
    <div className="form-mlabel">
      <label onClick={() => setsh(true)}>Signup</label>
      <label onClick={() => setsh(false)}>Signin</label>
    </div>
    {sh ? ( <Signup onToggle={changesh}/> )  : (
      <div className="form-container">
        <form onSubmit={getandcheck}>
          <p>
            <label> Name: </label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter your username"
              required
              autoComplete="off"
              onChange={(e) => setch({ ...check, username: e.target.value })}
            />
          </p>
          <p>
            <label> Password: </label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter password"
              required
              autoComplete="off"
              onChange={(e) => setch({ ...check, password: e.target.value })}
            />
          </p>
          <div>
            <button className="form-button" type="submit">Sign In</button>
          </div>
        </form>
      </div>
    )}
  </div>
</div>

    
    </>);
}

export default App;