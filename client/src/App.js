import './App.css';  
import {BrowserRouter, Route,Routes} from "react-router-dom";
import Login from './components/Login';
import SignUP from './components/signUP'; 
import Home from './components/Home';  
import Leaves from './components/Leaves'; 
import Tasks from './components/Tasks';
import Update from "./components/Update";

function App() {  
  return (
    <div className="App">    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}>Login</Route> 
          <Route path="/signup" element={<SignUP/>} >SignUP</Route> 
          <Route path="/home" element={<Home/>}>Home</Route> 
          <Route path="/leaves" element={<Leaves />}>Leaves</Route> 
          <Route path="/tasks" element={<Tasks/>}></Route> 
          <Route path="/update" element={<Update/>}></Route>
        </Routes> 
      </BrowserRouter>   
     
    </div>
  );
}

export default App;
