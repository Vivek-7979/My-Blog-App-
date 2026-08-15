// This is the store folder . like - where we store the global / common data to avoid the prop-drilling . So , everybody can access the data through it 
//  THIS FILE IS SPECIFICALLY USED FOR -> STATE MANAGEMENT ( by the RTK{Redux Toolkit }) 

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";

const store = configureStore({

    reducer : {
        auth: authReducer
    }
});

export default store ; 