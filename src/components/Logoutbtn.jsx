import React from "react";
import { Link } from "react-router-dom";
import{useDispatch} from "react-redux";
import { logout } from "../store/AuthSlice";
import authservice from "../appwrite/auth";
import { useNavigate} from "react-router-dom";
function LogoutButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        authservice.Logout().then(() => {// Logging out user using authservice logout method is defined in auth
            dispatch(logout());// calling logout action to update information in store
        });
        navigate('/login');// navigating to login page after logout
    };

    return (
        <button onClick={handleLogout} className="logout-button bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
        </button>
    );
}

export default LogoutButton;
