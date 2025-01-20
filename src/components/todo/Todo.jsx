import React, {} from 'react'
import './todo.css'

import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
// import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import LogoutComponent from './components/LogoutComponent';
import ListTodosComponents from './components/ListTodosComponents';
import ErrorComponent from './components/ErrorComponent';
import WelcomeComponent from './components/WelcomeComponent';
import LoginComponent from './components/LoginComponent';
import AuthProvider, { useAuth } from './components/security/AuthContext';
import TodoUpdateComponent from './components/TodoUpdateComponent';


function AuthenticatedRoute({children}){
    const authContext = useAuth();
    if(authContext.isAuthenticated){
        return children
    }
    
    return <Navigate to="/" />
}


function TodoApp(){
    return(
        <div className='TodoApp'>
        <AuthProvider>
        <BrowserRouter>
        <HeaderComponent />

        <Routes>
            <Route path='/' element={<LoginComponent/>}></Route>
            <Route path='/login' element={<LoginComponent/>}></Route>

            <Route path='/welcome/:username' element={
                <AuthenticatedRoute>
                    <WelcomeComponent/>
                </AuthenticatedRoute>
                
                }></Route>

            <Route path='/todos' element={
                 <AuthenticatedRoute>
                    <ListTodosComponents/>
                </AuthenticatedRoute>
                
                }></Route>

          <Route path='/todo/:id' element={
                 <AuthenticatedRoute>
                    <TodoUpdateComponent/>
                </AuthenticatedRoute>
                
                }></Route>

            <Route path='/logout' element={
                <AuthenticatedRoute>

                    <LogoutComponent/>
                </AuthenticatedRoute>

                }></Route>
            
            <Route path='*' element={<ErrorComponent/>}></Route>

         </Routes>
        {/* <FooterComponent /> */}

        </BrowserRouter>
        </AuthProvider>
        </div>
   )
}

 










export default TodoApp
