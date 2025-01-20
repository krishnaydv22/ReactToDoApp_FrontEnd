import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";


function LoginComponent() {

    const[userName, setUserName]  =  useState('in28minutes');
    const[password, setPassword]  =  useState();
    const[failedMsg, setFailedMsg]  =  useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();

     function handleUserName(e){
        setUserName(e.target.value);

    }

   
    function handlePassowordName(e){
        setPassword(e.target.value);

    }

//    async function handleClick(){
//         if(await authContext.login(userName,password)){
//             navigate(`/welcome/${userName}`)
            
//         }else{
//             setFailedMsg(true);

//         }
        
//     }

    const handleClick = async () =>{

        if(await authContext.login(userName,password)){
            navigate(`/welcome/${userName}`)
            
        }else{
            setFailedMsg(true);

        }

    }
    


  return (
    <div className="Login">
     <h1>Please Login</h1>

      <div className="LoginForm">
       
        { failedMsg && <div>Login failed</div>}


          <div>
               <label>User name : </label>
               <input type="text" name="username" value={userName} onChange={handleUserName}/>
           </div>
           
           <div>
               <label>Password : </label>
               <input type="password" name="password"  value= {password} onChange={handlePassowordName}/>
           </div>
           <div>
               <button type="button" name="submit" onClick={handleClick}>Login</button>
           </div>
        
        
        </div>      
    </div>
  )
}

export default LoginComponent;