import { apiClient } from "./ApiClient"

// export const retrieveAllTotodosForUsername = () => axios.get('http://localhost:8080/users/in28minutes/todos')
    // apiClient.get(`/users/${username}/todos`)
    // apiClient.get(`/users/in28minutes/todos`)
  
export const retrieveAllTotodosForUsername = (username) => apiClient.get(`/users/${username}/todos`)

export const deleteTodoById = (username,id) => apiClient.delete(`/users/${username}/todos/${id}`)

export const retrieveTodoById = (username,id) => apiClient.get(`/users/${username}/todos/${id}`)

export const updateTodoById = (username,id,todo) => apiClient.put(`/users/${username}/todos/${id}`,todo)

export const createTodoApi = (username,todo) => apiClient.post(`/users/${username}/todos`,todo)







