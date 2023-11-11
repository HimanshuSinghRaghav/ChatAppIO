import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import LogoTab from './LogoTab'
import AddUsers from './AddUsers'

const Chats = ({setShowUsers}) => {
 
  return (
    <div className='h-full'>
      <div className='h-[6%] p-2'>
            {/* <LogoTab/> */}
        
        <p className='text-4xl font-medium'>ChatApp</p>
        </div>
        <div className='h-[94%] overflow-y-scroll'>
        <AddUsers setShowUsers={setShowUsers}/>
        </div>
    </div>
  )
}

export default Chats

