import axios from "axios";
import instance from "./instance";

export const login = async(data)=>{
    const response = await axios.post('http://localhost:8000/user/login' , data)
    return response.data 
}

export const createChat = async(data)=>{
    const response = await instance.post('/chat' ,data)
    console.log(response)
    return response.data
}

export const addMessage = async(data)=>{
    const response = await instance.post('/message' , data)
    return response.data
}

export const getContacts = async()=>{
    const {data} = await instance.get('http://localhost:8000/users')
    return data
}

export const userChat = async(firstId ,secondId)=>{
    const response = await instance.get(`/chat/find/${firstId}/${secondId}`)
    console.log(response)
    return response.data
}

export const getChat = async(chatId)=>{
    const response = await instance.get(`/message/${chatId}`)
    console.log(response)
    return response.data
}