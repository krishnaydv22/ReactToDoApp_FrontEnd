import { useParams,Link} from 'react-router-dom'
import { useState } from 'react';
import {  retriveHelloWorldPathVariable } from '../api/HelloworldApi';
import { useAuth } from './security/AuthContext';

function WelcomeComponent(){

    const {username} = useParams();
    const [msg,setMsg] = useState(null);

    const authContext = useAuth();


    function handleGetHelloWorld(){
        // axios.get("http://localhost:8080/hello-world")
        // .then((response) => successMsg(response))
        // .catch((error)  => errorMsg(error))
        // .finally(() => console.log('clean up'))

        // retriveHelloWorldBean()
        // .then((response) => successMsg(response))
        // .catch((error)  => errorMsg(error))
        // .finally(() => console.log('clean up'))

        retriveHelloWorldPathVariable(authContext.username)
        .then((response) => successMsg(response))
        .catch((error)  => errorMsg(error))
        .finally(() => console.log('clean up'))
     }

     function successMsg(response){
        setMsg(response.data.message);
        // console.log(response.data);
        
     }

     function errorMsg(error){
        console.log(error);
        
     }
    

    return(
        <div>
            <h1>Welcome Page</h1>
            <h2>Welcome {username} </h2>
            <h3>Manage Your Todos - <Link to='/todos'>Go Here</Link></h3>

            <button className='btn btn-success' onClick={handleGetHelloWorld}>Get Hello world</button>
            <div>{msg}</div>
        </div>
    )
}

export default WelcomeComponent;