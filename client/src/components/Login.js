import React, { useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() { 
    let emailInputRef = useRef();
    let passwordInputRef = useRef(); 
    let navigate = useNavigate();  
    let dispatch = useDispatch();

    useEffect(() => {
        // if (localStorage.getItem("email") && localStorage.getItem("password")) {
        //     emailInputRef.current.value = localStorage.getItem("email");
        //     passwordInputRef.current.value = localStorage.getItem("password");
        //     validateLogin();
        // } 
        validateToken(); 

    },[])


    let validateToken = async () => {
        if (localStorage.getItem("token")) { 
        let dataToSend = new FormData()
        dataToSend.append("token", localStorage.getItem("token"));

        let reqOptions = {
            method: "POST",
            body: dataToSend,
            
        };

        let JSONData = await fetch("http://localhost:7777/validateToken", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData); 
            if (JSOData.status == "failure") {
                console.log(JSONData.msg);
            } else {
                navigate("/home");
                dispatch({ type: "login", data: JSOData.data[0]});
        }
    
    }
    } 

    let validateLogin = async () => {
        let dataToSend = new FormData();
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);
    
        let reqOptions = {
            method: "POST",
            body: dataToSend,
        }; 

        let JSONData = await fetch("http://localhost:7777/validatelogin", reqOptions);
        let JSOData = await JSONData.json();  
        console.log(JSOData);
        if (JSOData.status == "failure") {
            alert(JSOData.msg);
        }
        else { 
            // localStorage.setItem("email", emailInputRef.current.value);
            // localStorage.setItem("password", passwordInputRef.current.value); 
            localStorage.setItem("token",JSOData.tokenData);
            navigate("/home");
            dispatch({type:"login",data: JSOData.data[0]});
        }
        console.log(JSOData);   
    } 
   
  return (
      <div>
          <h1>Login</h1> 
    <form>
      <div>
        <label>Email</label> 
        <input ref={emailInputRef}></input>      
    </div> 
    <div>
        <label>Password</label> 
        <input ref={passwordInputRef} type="password"></input>      
              </div>  
              <button type="button" onClick={() => { 
                  validateLogin();  
                //   validateToken(); 
        }}>Login</button>
          </form>   
          <br></br>
          <Link to="/signup">SignUp</Link>
      </div> 
  )
}

export default Login