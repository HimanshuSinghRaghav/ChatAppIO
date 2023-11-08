import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const authSlice = createSlice({
    name:'authSlice',
    initialState:{},
    reducers:{ 
        setAuth(state , action){
            return {...state, ...action.payload};
        }
    }
})

export const {setAuth} = authSlice.actions

export default authSlice