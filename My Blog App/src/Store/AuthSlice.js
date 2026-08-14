// File de andar kya hai oh important hunda na ki file app kithe hai ... File kite bhi ho sakdi hai bs usde andar jo likhya wa hai oh zaruri hai 

import {createSlice} from "@reduxjs/toolkit"


//  Intially what the states will be look like . As , RTK is a state managemenet library 
const initialState = {

    status : false , 
    userData: null 
}

const authSlice = createSlice({

    name:"auth",
    initialState,

    // Slice is created . In which reducers are there . In which , reducers means : the function or the methods that will keep track of the state with the help of action's payload .
    reducers : {

        login: (state , action ) => {
            state.status = true ;
            state.userData = action.payload.userData;
        },

        logout: (state) => {
            state.status = false ; 
            state.userData = null ;
        }
    }
})

export const { login , logout } = authSlice.actions ;   // This is the syntax have to do it like this

export default authSlice.reducer ; 