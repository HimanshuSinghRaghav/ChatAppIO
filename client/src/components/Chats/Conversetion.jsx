import React, { useEffect, useRef, useState } from 'react'
import { FaPaperPlane, FaPlane } from 'react-icons/fa'
import { addMessage, getChat, userChat } from '../../apis'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../../redux/slices/messageSlice'
import CurrentUser from './CurrentUser'

const Conversection = ({setSendMessage , receivedMessage}) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const auth = useSelector((state) => state.auth)
  const currentChat = useSelector((state) => state.currentChat)
  const { userChatsWithCurrentUser, messages } = useSelector((state) => state.messages)
  const [allMessages, setAllMessages] = useState(messages)
  const parentDivRef = useRef(null);


  useEffect(() => {setAllMessages(messages)}, [messages])
   // Always scroll to last Message
   useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[allMessages])
  const sendMessage = async () => {
    if (message === '') return
    const newMessage = {
      senderId : auth._id,
      text: message,
      chatId: currentChat._id,
  }
  const receiverId = userChatsWithCurrentUser.members.find((id)=>id!==auth._id);
    setSendMessage({...newMessage , receiverId})

    const chat = await addMessage({ text: message, chatId: currentChat._id, senderId: auth._id })
    console.log(chat)
   
    const messages = await getChat(chat.chatId)
    dispatch(setMessages({ userChatsWithCurrentUser, messages }))
    setMessage('')
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const date = new Date(timestamp)
    const diff = (now - date) / 1000

    if (diff < 60) {
      return 'just now'
    }
  }

  const formatDate = (timestamp) => {
    const now = new Date()
    const date = new Date(timestamp)

    if (now.getDate() === date.getDate()) {
      return 'Today'
    } else if (now.getDate() - date.getDate() === 1) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString()
    }
  }

// Receive Message from parent component
useEffect(()=> {
  console.log("Message Arrived: ", receivedMessage)
  if (receivedMessage !== null && receivedMessage.chatId === userChatsWithCurrentUser._id) {
    setAllMessages([...allMessages, receivedMessage]);
  }

    console.log(parentDivRef.current , parentDivRef.current.scrollTop ,parentDivRef.current.scrollHeight)
    parentDivRef.current.scrollIntoView({ behavior: 'smooth'})
  
  
},[receivedMessage])

useEffect(() => {
  parentDivRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the last message
}, [allMessages]);

const groupMessagesByDate = (messages) => {
  const groups = {};
  messages.forEach((message) => {
    const date = formatDate(message.createdAt);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });
  return Object.entries(groups).map(([date, messages]) => ({ date, messages }));
};

const groupedMessages = groupMessagesByDate(allMessages);

  return (
    <div className='h-full p-6 space-y-2'>
      <div className='h-[10%]'><CurrentUser /></div>
      <div ref={parentDivRef} className='h-[80%] space-y-4 mb-2 overflow-y-scroll w-full relative'>

{groupedMessages.map(({ date, messages }) => {
  return <>
  <div className='flex justify-center'><p className='bg-gray-200 inline-block text-center px-2 py-1 rounded-md text-gray-500 font-medium'>{date}</p></div>
   {messages?.map((message) => 
        
        {
          const date = formatDate(message.createdAt)
          const time = formatTime(message.createdAt)
          return <div key={message._id} className={`w-full flex flex-col-reverse ${message.senderId !== auth._id ? 'items-start' : 'items-end'}`}>
            {/* {date} */}
            <div className={`p-4 inline-block bg-white rounded-xl  ${message.senderId !== auth._id ? 'rounded-tl-none' : 'rounded-tr-none'}`}>
              {message.text} {time}
              
            </div>
          </div>
})}
  </>
})}
       

      </div>
      <div className='relative flex self-end'>
        
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key==="Enter") {
              console.log(e.key)
              sendMessage();
            }
          }}
          type='text'
          placeholder='Start Conversetion.....'
          className='w-full h-14 rounded-full p-2 px-6 text-xl'
        />
        <FaPaperPlane
          onClick={() => sendMessage()}
          className='text-xl absolute top-5 right-8 rotate-3 hover:top-4 hover:right-6 duration-300 cursor-pointer'
        />
      </div>
    </div>
  )
}

export default Conversection