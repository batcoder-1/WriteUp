import { createSlice } from "@reduxjs/toolkit";// build this to control state when login and logout
const initialState={
    status:false,
    userdata:null

}
const AuthSlice=createSlice({
    name:'Auth',
initialState,
reducers: {
    login:(state,action)=>{
        state.status=true,
        state.userdata=action.payload
    },
    logout:(state)=>{
        state.status=false;
        state.userdata=null;
    }
}
})
export const{login,logout}=AuthSlice.actions;
export default AuthSlice.reducer;