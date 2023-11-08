import React, { useState } from 'react'
import { login } from '../../apis'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuth } from '../../redux/slices/authSlice'

const index = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const handleLogin = async()=>{
        const data = await login({email , password});
        console.log(data)
        dispatch(setAuth(data.user))
        localStorage.setItem('AUTH_TOKEN' , data.user.token)
        navigate('/')
    }
  return (
    <div className='flex justify-center items-center h-screen p-4 m-4 space-x-2 bg-gray-200 bg-opacity-40 rounded-md'>
        <div className='flex-col space-y-3 bg-white rounded-lg p-4'>
            <p className='text-center text-xl'>Login</p>
            <div className='flex flex-col'> 
                <label>Username/Email</label>
                <input onChange={(e)=>{setEmail(e.target.value)}} type='text' className='p-2 ring ring-gray-100 rounded-md'/>
            </div>
            <div className='flex flex-col'>
                <label>Password</label>
                <input onChange={(e)=>{setPassword(e.target.value)}} type='text' className='p-2 ring ring-gray-100 rounded-md'/>
            </div>
            <button onClick={()=>handleLogin()} className='p-2 bg-gray-500 w-full rounded-md bg-opacity-25 hover:bg-opacity-30'>Login</button>
        </div>
    </div>
  )
}

export default index