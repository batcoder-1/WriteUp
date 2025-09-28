import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteServices from "../src/appwrite/configure";
import Container from "../src/components/Container";
import Card from "../src/components/Card";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.Auth.status);

  useEffect(() => {
    appwriteServices.getLimitedPosts().then((res) => {
      if (res) setPosts(res.documents);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
        <>
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
                <span className="text-gray-700 font-medium">Loading...</span>
              </div>
            </div>
            </>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to WriteUp
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A place to share knowledge, ideas, and connect with others.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login to Read Posts
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Create Account
            </Link>
          </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
  <div className="p-6 bg-white rounded-xl shadow-md">
    <h3 className="font-semibold text-lg mb-2">Read Posts</h3>
    <p className="text-gray-600 text-sm">
      Access exclusive articles and insights.
    </p>
  </div>
  <div className="p-6 bg-white rounded-xl shadow-md">
    <h3 className="font-semibold text-lg mb-2">Create Posts</h3>
    <p className="text-gray-600 text-sm">
      Share your thoughts and ideas with the community.
    </p>
  </div>
  <div className="p-6 bg-white rounded-xl shadow-md">
    <h3 className="font-semibold text-lg mb-2">Explore</h3>
    <p className="text-gray-600 text-sm">
      Browse through categories and discover new content.
    </p>
  </div>
</div>

        </div>
      </div>
    );
  }

  // ----------------------------
  // Logged IN view
  // ----------------------------
  return (
    <div className="w-full py-8 bg-white">
      <Container>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.$id} {...post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-2">About This Site</h3>
              <p className="text-sm text-gray-600">
                WriteUp is a platform to share and learn from each other. Explore
                posts and contribute your thoughts.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-2">Categories</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>Tech</li>
                <li>Lifestyle</li>
                <li>Programming</li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}

export default Home;
