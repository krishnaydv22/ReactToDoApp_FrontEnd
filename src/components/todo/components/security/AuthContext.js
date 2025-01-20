import { createContext, useContext, useState } from "react";
import { apiClient } from "../../api/ApiClient";
import { executeBasicAuthenticationService, executeBasicJwtAuthenticationService } from "../../api/AuthenticationApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({children}){
    const [isAuthenticated,setAuthenticated] = useState(false);
    const [username,setUsername] = useState(null);
    const [token,setToken] = useState(null);


    // function login(username, password){
    //     if(username === 'in28minutes' && password ==='12345'){
    //         setUsername(username);
    //         setAuthenticated(true);
    //         return true;
    //     }
    //     else{
    //         setAuthenticated(false);
    //         return false;
    
    //     }
    // }


//                  Basic Authetication Using Base64 ------- Not Safe

    //  async function login(username, password){

    //         const baToken = 'Basic ' + window.btoa(username + ":" + password)
        
    //     try{
    //         const response =  await executeBasicAuthenticationService(baToken)
    //             if(response.status == 200){
    //                 setUsername(username);
    //                 setAuthenticated(true);
    //                 setToken(baToken);

    //                 apiClient.interceptors.request.use(
    //                       (config) => {
    //                         config.headers.Authorization = baToken
    //                         return config;
    //                       }

    //                     )
                        
    //                     return true;
    //             }
    //             else{
    //                 logout();
    //                 return false;

    //             }
    //         }catch(error){
    //                 logout();
    //                 return false;

    //         }
    // }



    //                Jwt Authentication 

    async function login(username, password){

    
    try{
        const response =  await executeBasicJwtAuthenticationService(username,password)
            if(response.status == 200){
               const jwtToken = 'Bearer ' + response.data.token;

                setUsername(username);
                setAuthenticated(true);
                setToken(jwtToken);

                apiClient.interceptors.request.use(
                      (config) => {
                        config.headers.Authorization = jwtToken
                        return config;
                      }

                    )
                    
                    return true;
            }
            else{
                logout();
                return false;

            }
        }catch(error){
                logout();
                return false;

        }
}

    function logout(){
        setToken(null);
        setUsername(null);
        setAuthenticated(false);
    }
    
// const valueToPassed = {number,isAuthenticated,setAuthenticated}; --> will pass as object



    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout,username,token}}>
            {children}
        </AuthContext.Provider>

    )
}
