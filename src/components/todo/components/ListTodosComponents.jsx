import { useEffect, useState } from "react";
import { deleteTodoById, retrieveAllTotodosForUsername } from "../api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponents(){

  const [todos,setTodos] = useState([])
  const [message,setMessage] = useState(null);
  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();
  
  

    // const today = new Date();
    // const targetDate = new Date(today.getFullYear() + 12, today.getMonth(),today.getDate());
    // const formattedDate = targetDate.toLocaleDateString('en-IN', {
    //   weekday: 'short',   // Abbreviated weekday (Mon, Tue, etc.)
    //   year: 'numeric',    // Full year
    //   month: 'short',     // Abbreviated month (Dec, Jan, etc.)
    //   day: 'numeric'      // Numeric day of the month
    // });
  
  
    //   const todos = [
    //     // {id : 1, dsetTodosescription : 'Learn AWS',done:false,targetdate:formattedDate},
    //     //   {id : 2, description : 'Learn Fullstack',done:false,targetdate:formattedDate},
    //     //   {id : 3, description : 'Learn Docker',done:false,targetdate:formattedDate},
  
    //   ]

      useEffect( () => refreshTodos(),[])
        
     

      function refreshTodos(){
        retrieveAllTotodosForUsername(username)
        .then(res => { 
            // console.log(res)
            setTodos(res.data)
        }
       )
        .catch(error => console.log(error))
    }

    

    function handleDelete(id){
        // console.log(id);
        
        deleteTodoById(username,id)
        .then(() =>{
            setMessage(`Delete of todo with id = ${id} successfull`)
            refreshTodos()
        } 
        )
         
        .catch(error => console.log(error))


        setTimeout(() => {
            setMessage(null)
        },5000)
      
        
    }

    function handleUpdate(id){
        navigate(`/todo/${id}`)
    }

    function handleAddTodo(){
        navigate(`/todo/-1`)

    }

   
  
      return(
          <div className='container'>
              <h1>Yours Todos!</h1>
              <div >
                {message && <div className="alert alert-warning">{message}</div>}
 
                  <table className='table'>
                      <thead>
  
                          <tr>
                              <th>Description</th>
                              <th>Is Done</th>
                              <th>Target Date</th>
                              <th>Delete</th>
                              <th>Update</th>
  
                          </tr>
  
                      </thead>
                      <tbody>
                      
                          {todos.map((ele) => (
                              <tr key={ele.id}>
                                   
                                   <td>{ele.description}</td>
                                   <td>{ele.done.toString()}</td>
                                   <td>{ele.targetDate.toString()}</td>
                                   <td onClick={() => handleDelete(ele.id)}><button className="btn btn-warning">Delete</button></td>
                                    
                                   <td onClick={() => handleUpdate(ele.id)}><button className="btn btn-success">Update</button></td>
                              </tr>
                          )
  
                          ) 
                             
                             }
  
                     </tbody>
                  </table>

                  <button className="btn  btn-success m-5" onClick={handleAddTodo}>Add Todo</button>
                  
              </div>
          </div>
      )
  }

  export default ListTodosComponents;