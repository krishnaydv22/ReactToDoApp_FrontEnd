import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createTodoApi, retrieveTodoById, updateTodoById } from '../api/TodoApiService';
import { useAuth } from './security/AuthContext';
import {ErrorMessage, Field, Form, Formik} from 'formik';


function TodoUpdateComponent() {

  const {id} =  useParams();
  const authContext = useAuth();
  const username = authContext.username;
  const [description,setDescription] = useState('');
  const [targetDate,setTargetDate] = useState('');
  const navigate = useNavigate();
// console.log(targetDate);



  useEffect(() => {
    const retrieveTodoOfId = () => {
      retrieveTodoById(username, id)
        .then((res) => {setDescription(res.data.description)
                     setTargetDate(res.data.targetDate)})
        .catch(error => console.log(error));
    };
    if (id != -1) {
      retrieveTodoOfId();
    }
    }, [id, username]);  // Only include 'id' and 'username' as dependencies
  
    
 function handleSubmit(values){
  // console.log(values);

  const todo = {
    id:id,
    username:username,
    description:values.description,
    // targetDate:new Date(values.targetDate).toISOString(),
    targetDate:values.targetDate,

    done:false

  }

  // console.log(todo);
  if(id == -1){
    createTodoApi(username,todo)
      .then((res) => {
        navigate('/todos')

      })
      .catch(error => console.log(error))
  }else{
    updateTodoById(username,id,todo)
    .then((res) => {
      navigate('/todos')
      
    })
    .catch(error => console.log(error))
   }

  }

 

 function validate(values){
  let error = {}
               
  if(values.description.length < 5){
    error.description = 'Enter atleast 5 character';
  }
  if(values.targetDate == null || values.targetDate === ''){
    error.targetDate = "please enter the Date"
  }
  // console.log(error);
  return error;
  
 }
  
 


//    function retrieveTodoOfId(){
//     retrieveTodoById(username,id)
//     .then( res => console.log(res.data)
//     ).catch(error => console.log(error)
//     )
//    }

  return (
    <div>
        <h1>Enter Todo Details</h1>
        <div>
           <Formik initialValues = 
                   {{description,targetDate}} 
                   enableReinitialize = {true} 
                   onSubmit={handleSubmit}
                   validate={validate}
                   validateOnChange = {false}
                   validateOnBlur = {false}>
             {
              (props) =>(
                  <Form >
                    <ErrorMessage name="description" 
                                  component="div"
                                  className='alert alert-warning'/>

                      <ErrorMessage name="targetDate" 
                                  component="div"
                                  className='alert alert-warning'/>
                                  
                      <fieldset className='form-group'>
                          <label>Description</label>
                          <Field type="text" className ='form-control' name="description"></Field>
                       </fieldset>
                       <fieldset className='form-group'>
                          <label>Target Date</label>
                          <Field type="date" className ='form-control' name="targetDate"></Field>
                       </fieldset>
                       <div>
                        <button className='btn btn-success' type='submit'>Save</button>
                       </div>
                  </Form>

              )


             }



           </Formik>
        </div>
        
        
      
    </div>
  )
}

export default TodoUpdateComponent
