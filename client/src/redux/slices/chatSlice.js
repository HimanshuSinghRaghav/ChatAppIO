import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const chatSlice = createSlice({
    name:'authSlice',
    initialState:{},
    reducers:{ 
        setChat(state , action){
            return {...state, ...action.payload};
        }
    }
})

export const {setChat} = chatSlice.actions

export default chatSlice