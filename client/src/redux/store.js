import {configureStore, createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:"auth",
    initialState:{isLoggedIn: false},
    reducers:{
        login(state){
            state.isLoggedIn = true
        },
        logout(state){
            state.isLoggedIn
             = false
        }
    }
})

export const action = authSlice.actions; 

export const store = configureStore({
    reducer: authSlice.reducer
})
