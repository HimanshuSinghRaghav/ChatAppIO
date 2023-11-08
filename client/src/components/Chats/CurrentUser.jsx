import React from 'react'
import { useSelector } from 'react-redux'

const CurrentUser = () => {
    const { userChatsWithCurrentUser } = useSelector((state) => state.messages)
    const auth = useSelector((state) => state.auth)
    const userId = userChatsWithCurrentUser.members.find((id)=>id!==auth._id);
    const users = useSelector((state) => state.users)
    const user = users.find((user)=>user._id===userId)
    return (
    <div className='  '>
         <div
                                
                                className='flex bg-gray-300 hover:bg-opacity-40 rounded-md bg-opacity-30 space-x-3 p-2 items-center overflow-y-scroll'
                            >
                                <img src={user.profile_picture} className='w-14 rounded-full h-14' />
                                <div >
                                <p className='text-xl text-gray-700 font-serif'>{user.name}</p>
                                {user.isOnline &&<div className='flex items-center space-x-2'><section className='w-2 h-2 rounded-full bg-green-500'></section> <p className='text-gray-600 font-bold'>Online</p></div>}
                                </div>
                            </div>
    </div>
  )
}

export default CurrentUser