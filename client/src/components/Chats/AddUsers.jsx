import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createChat, getChat, getContacts, userChat } from '../../apis'
import { setUser } from '../../redux/slices'
import { setChat } from '../../redux/slices/chatSlice'
import { setMessages } from '../../redux/slices/messageSlice'
const AddUsers = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const users = useSelector((state) => state.users)
    const auth = useSelector((state) => state.auth)

    

    const userChats = async()=>{
        const chat = await userChat(auth._id)
        console.log(chat)
        return chat
    }

    const setCurrentChat = async (receiverId) => {
        const chat = await createChat({ senderId: auth._id, receiverId })
        const userChatsWithCurrentUser = await userChat(auth._id , receiverId)
        const messages = await getChat(userChatsWithCurrentUser._id)
        dispatch(setMessages({userChatsWithCurrentUser , messages}))
        console.log(chat , receiverId)
        dispatch(setChat(chat))
    }

    

    return (
        <div className=''>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className='space-y-2 p-2 overflow-y-scroll '>
                    {users?.map((user, index) => {
                        return (
                            <div
                                onClick={async() => {setCurrentChat(user._id) , setSelectedUser(user)}}
                                className='flex bg-gray-300 hover:bg-opacity-40 rounded-md bg-opacity-30 space-x-3 p-2 items-center overflow-y-scroll'
                                key={index}
                            >
                                <img src={user.profile_picture} className='w-14 rounded-full h-14' />
                                <div >
                                <p className='text-xl text-gray-700 font-serif'>{user.name}</p>
                                {user.isOnline &&<div className='flex items-center space-x-2'><section className='w-2 h-2 rounded-full bg-green-500'></section> <p className='text-gray-600 font-bold'>Online</p></div>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default AddUsers
  