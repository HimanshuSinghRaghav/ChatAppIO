import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chats from '../../components/Chats/Chats'
import Conversetion from '../../components/Chats/Conversetion'
import {io} from 'socket.io-client'
import { setUser } from '../../redux/slices'
import { getContacts } from '../../apis'

const index = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [onlineUsers, setOnlineUsers] = useState([]) 
  const { userChatsWithCurrentUser, messages } = useSelector((state) => state.messages)
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [showUsers, setShowUsers] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const socket = useRef()
  
  const getContact = async () => {
    const contact = await getContacts()
    dispatch(setUser(contact))
    setIsLoading(false)
    setUsers(contact)
}

useEffect(() => {
    getContact()
}, [])

  useEffect(()=>{
      socket.current = io("http://localhost:8800")
      socket.current.emit("new-user-add", auth._id)
      socket.current.on("get-users", users=>{
          console.log(users)
          setOnlineUsers(users)
      }   )
  },[auth])

  // Send Message to socket server
  useEffect(() => {
    console.log('/////////////')
    if (sendMessage!==null) {
      console.log(sendMessage)
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    console.log(isTyping , '///////////')
      const userId = userChatsWithCurrentUser.members.find((id)=>id!==auth._id);
      const user = users.find((user)=>user._id===userId)
      socket.current.emit("is-typing", {receiverId:user?._id ,senderId:auth._id, isTyping});
  }, [isTyping]);

  useEffect(() => {
    socket.current.on("is-user-typing", async(data) => {
      const contact = await getContacts()
      console.log(contact)
      const updatedContacts = contact.map(user => {
        if (user._id === data.senderId) {
          if (data.isTyping) {
            return {...user, isOnline:true,isTyping:true}
          } else {
            return {...user,isOnline:true, isTyping: false}
          }
        } else {
          return user
        }
      })
      dispatch(setUser(updatedContacts))
      setUsers(updatedContacts)
    })

  }, []);

   // Get the message from socket server
   useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log(data , '///////////)')
      setReceivedMessage(data);
    }

    );
  }, []);
  

  const checkOnlineStatus = (chat) => {
      const chatMember = chat.members.find((member) => member !== auth._id);
      const online = onlineUsers.find((user) => user.userId === chatMember);
      return online ? true : false;
    };

    useEffect(() => {
      checkOnlineStatus(userChatsWithCurrentUser);
    });

    useEffect(() => {
      // Map through the users and check if they are online
      const updatedContacts = users.map(user => {
          const onlineUser = onlineUsers.find(onlineUser => onlineUser.userId === user._id)
          if (onlineUser) {
              return {...user, isOnline: true}
          } else {
              return {...user, isOnline: false}
          }
      })
      dispatch(setUser(updatedContacts))

      // setUsers(updatedContacts)
  }, [onlineUsers, users])
  return (
    <div className='flex h-screen p-4 m-4 space-x-2'>
     { isLoading?<>...Loading</>:<><div className={`md:block md:w-1/4 bg-gray-200 bg-opacity-40 rounded-md ${showUsers?'block w-full':'hidden'}`}>
        <Chats setShowUsers={setShowUsers}/>
      </div>
       <div className={`w-full md:w-4/5  bg-gray-200 bg-opacity-40 rounded-md ${showUsers?'hidden md:blobk':'block'}`}>
        <Conversetion setIsTyping={setIsTyping} setSendMessage={setSendMessage} receivedMessage={receivedMessage} setShowUsers={setShowUsers}/>
       </div></>}
      </div>
  )
}

export default index