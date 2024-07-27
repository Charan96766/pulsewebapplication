import React from 'react'
import { useSelector } from 'react-redux'
import TopNavigation from './TopNavigation';

function Home() {  
  let dataFromStore = useSelector((storeObj) => {
    return storeObj; 
  }) 
  console.log(dataFromStore); 
  return (
    <div> 
      <TopNavigation></TopNavigation>
      <h1>hello {dataFromStore.loginDetails.firstName} {dataFromStore.loginDetails.lastName}</h1> 
      <img src={`http://localhost:7777/${dataFromStore.loginDetails.image}`}></img>
    </div> 

  )
}

export default Home;