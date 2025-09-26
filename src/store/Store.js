import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from "../store/AuthSlice"
const Store=configureStore({
reducer:{
    Auth:AuthSlice
}
})
export default Store;