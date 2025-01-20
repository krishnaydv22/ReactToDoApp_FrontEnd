
import { apiClient } from "./ApiClient"

export const retriveHelloWorldBean = () =>  apiClient.get("/hello-world-bean")

//Response to preflight request doesn't pass access control check: 
export const retriveHelloWorldPathVariable = (username) =>  apiClient.get(`/hello-world/path-variable/${username}`,{
    // headers :{
    //     Authorization : 'Basic aW4yOG1pbnV0ZXM6ZHVtbXk='
    // }
})

