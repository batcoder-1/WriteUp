import React, { useEffect, useState } from "react";
import authservice from "../src/appwrite/auth";
import LogoutButton from "../src/components/Logoutbtn";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../src/store/AuthSlice";
import appwriteServices from "../src/appwrite/configure";
import { set } from "react-hook-form";

function Account() {
  const status = useSelector((state) => state.Auth.status);
  const [authStatus, setAuthStatus] = useState(status);
  let userdata = useSelector((state) => state.Auth.userdata);
  const [user, setUser] = useState(userdata || {});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!userdata) userdata = await authservice.getuser();
        const userinfo = await appwriteServices.getUser(userdata.$id);
        setUser(userinfo);
        setFormData(userinfo);
        dispatch(login(userinfo));
        setAuthStatus(!!userinfo);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setFormData(user); // reset form data
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        Image: {
          file, 
          preview: URL.createObjectURL(file), 
        },
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let fileId = user.Image;
      if (formData.Image?.file) {
        const uploadedFile = await appwriteServices.uploadFile(formData.Image.file);
        if(fileId) await appwriteServices.deletefile(fileId); // delete old file
        fileId = uploadedFile.$id;
      }

      const updatedUser = await appwriteServices.updateUser(
        user.$id,
        formData.Username,
        fileId,
        user.Blogs,
        user.email
      );

      await authservice.updateName(formData.Username);
      setUser(updatedUser);
      dispatch(login(updatedUser));
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating user:", err);
    }
    setSaving(false);
  };

  if (!authStatus) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading account...
        </p>
      </div>
    );
  }
if(saving){
 return (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white px-6 py-4 rounded-lg shadow-md flex items-center space-x-3">
      <svg
        className="w-6 h-6 text-indigo-600 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span className="text-gray-700 font-medium">Saving Changes...</span>
    </div>
  </div>
);
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-6 shadow-md flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Account</h1>
          <p className="text-indigo-200 mt-1">
            Welcome back, {user.Username || "User"} 👋
          </p>
        </div>
        <button
          onClick={handleEditToggle}
          className="bg-white text-indigo-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-indigo-50 transition"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 p-8 flex flex-col gap-8 max-w-4xl mx-auto w-full">
        {/* Profile Card */}
        <section className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-lg transition">
          {/* Profile Image */}
          <div className="relative">
            {formData.Image?.preview ? (
              <img
                src={formData.Image.preview}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200"
              />
            ) : user.Image ? (
              <img
                src={appwriteServices.getfileUrl(user.Image)}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200"
              />
            ) : (
              <div className="w-28 h-28 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-4xl font-bold">
                {user.Username ? user.Username[0].toUpperCase() : "U"}
              </div>
            )}

            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-indigo-600 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-indigo-700">
                Change
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 w-full">
            {isEditing ? (
              <input
                type="text"
                name="Username"
                value={formData.Username || ""}
                onChange={handleChange}
                placeholder="Enter username"
                className="block w-full border rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-400"
              />
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.Username || "No Name"}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
            <p className="text-gray-500 font-medium">Status</p>
            <p className="text-green-600 font-bold mt-1">Active</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
            <p className="text-gray-500 font-medium">Blogs Written</p>
            <p className="text-indigo-600 font-bold text-lg mt-1">
              {user.Blogs || 0}
            </p>
          </div>
        </section>

        {/* Save button */}
        {isEditing && (
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </main>

      {/* Footer with logout */}
      <footer className="bg-gray-50 p-6 flex justify-end border-t">
        <LogoutButton />
      </footer>
    </div>
  );
}

export default Account;
