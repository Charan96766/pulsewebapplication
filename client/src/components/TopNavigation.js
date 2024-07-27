import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'



function TopNavigation() { 
    let storeObj = useSelector((obj) => {
        return obj;  
    })
    let navigate = useNavigate(); 

    useEffect(() => {
        if (storeObj && storeObj.loginDetails && storeObj.loginDetails.firstName) {
        
        } else {
            navigate("/")
        }
    }, []); 

    
    let deleteFromDB = async () => {  
     let dataToSend = new FormData();
     dataToSend.append("email", storeObj.loginDetails.email);
       let  reqOptions = {
           method: "DELETE", 
           body:dataToSend,
        }  

        let JSONData = await fetch("http://localhost:7777/delete", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
    };
    return ( 
      <div> 
          <nav>
              <NavLink to="/home" style={(obj) => {
                  if (obj.isActive == true) {
                      return ({ backgroundColor: "white", color: "green" });
                  };

              }}>Home</NavLink> 
              <NavLink to="/leaves" style={(obj) => {
                  if (obj.isActive == true) {
                      return ({ backgroundColor: "white", color: "green" });
                  };

              }}>Leaves</NavLink> 
              <NavLink to="/tasks" style={(obj) => {
                  if (obj.isActive == true) {
                      return ({ backgroundColor: "white", color: "green" });
                  };

                }}>Tasks</NavLink> 
                <NavLink to="/update" style={(obj) => { 
                    if (obj.isActive == true) {
                        return ({backgroundColor: "white", color: "green"})
                    }

                }}>Update</NavLink> 
                <NavLink to="/" style={(obj) => {
                  if (obj.isActive == true) {
                      return ({ backgroundColor: "white", color: "green" });
                  };
                }} onClick={() => {
                    deleteFromDB(); 
                    }}> Delete</NavLink> 
                


              <NavLink to="/" style={(obj) => {
                  if (obj.isActive == true) {
                      return ({ backgroundColor: "white", color: "green" });
                  };
                }} onClick={() => {
                    // localStorage.removeItem("email");
                    // localStorage.removeItem("password"); 
                    localStorage.removeItem("token");
                    navigate("/")
                }}>LogOut</NavLink> 

          </nav>

    </div> 
    

  )
}

export default TopNavigation