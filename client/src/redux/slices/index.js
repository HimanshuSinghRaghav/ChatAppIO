import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const usersSlice = createSlice({
    name:'usersSlice',
    initialState:[],
    reducers:{ 
        setUser(state , action){
            state = action.payload
            return state
        }
    }
})

export const {setUser} = usersSlice.actions


export default usersSlice