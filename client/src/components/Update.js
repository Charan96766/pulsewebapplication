import React, { useRef, useState } from 'react'  
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';


function SignUP() { 
    let storeObj = useSelector((obj) => { 
        return obj;
    }) 
    console.log(storeObj);

    let [image, setImage] = useState("./images/preview.png");
    let imageInputRef = useRef();
    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef(); 

    let sendUpdateDataToServer = async () => {
        let dataToSend = new FormData();
        dataToSend.append("firstName", firstNameInputRef.current.value);
        dataToSend.append("lastName", lastNameInputRef.current.value); 
        dataToSend.append("image", imageInputRef.current.files[0]);   
        dataToSend.append("age", ageInputRef.current.value); 
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);
        
        let reqOptions = {
            method: "PUT",
            body:dataToSend,
        } 

        let JSONData = await fetch("http://localhost:7777/update", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        if (JSOData.status == "success") {
            alert("success");
            alert(JSOData.msg);
       }
    }
    return ( 
       
        <div>  
             <TopNavigation/>
            <form>
                <div>
                    <label>First Name</label>
                    <input ref={firstNameInputRef}></input>
                </div>
                <div>
                    <label>Last Name</label>
                    <input ref={lastNameInputRef}></input>
                </div>
                <div>
                    <label>Email</label>
                    <input ref={emailInputRef} readOnly value={storeObj.loginDetails.email}></input>
                </div>
                <div>
                    <label>Pssword</label>
                    <input type="password" ref={passwordInputRef}></input>
                </div>
                <div>
                    <label>Profile Pic</label>
                    <input type="file" multiple ref={imageInputRef} onChange={() => {
                        let object = imageInputRef.current.files[0];
                        let url = URL.createObjectURL(object);
                        setImage(url);
                    }}></input>
                </div>
                <div>
                    <label>Preview</label>
                   
                    <br></br>
                    <img src={image} alt=""></img>
                </div>
                <div>
                    <label>Age</label>
                    <input ref={ageInputRef}></input>
                </div>
                <button type="button" onClick={() => {
                    sendUpdateDataToServer();
                }}>Update</button>
            </form> 
        </div>
    )
}

export default SignUP