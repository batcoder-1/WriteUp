import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authservice from "../appwrite/auth";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../store/AuthSlice";
import Input from "./Input";
import Logo from "./Logo";
import { useForm } from "react-hook-form";
import appwriteServices from "../appwrite/configure";
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const Signup = async (data) => {
    setLoading(true);
    setError("");
    try {
      const userdata = await authservice.createAccount(data);
      if (userdata) {
        const response = await authservice.getuser();
        if (response) {
          await appwriteServices.createUser(response.$id,response.name,response.email); // create a user document in the userinfo database
          dispatch(storeLogin(response));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10">
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2"></div>
              <span className="text-indigo-700 font-medium">Creating Account</span>
            </div>
          </div>
        )}
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <span className="w-20">
            <Logo width="100%" />
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800">
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-600 mt-4 text-center text-sm font-medium">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(Signup)} className="mt-6 space-y-5">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Invalid email format",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />

          {/* Button */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
