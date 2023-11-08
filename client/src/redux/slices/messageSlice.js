import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const messageSlice = createSlice({
    name:'messageSlice',
    initialState:{},
    reducers:{ 
        setMessages(state , action){
            state = action.payload
            return state
        }
    }
})

export const {setMessages} = messageSlice.actions


export default messageSlice