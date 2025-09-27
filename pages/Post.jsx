import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteServices from "../src/appwrite/configure";
import Button from "../src/components/Button";
import Container from "../src/components/Container";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import authservice from "../src/appwrite/auth";
import { set } from "react-hook-form";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("Author"); // Placeholder for author name
  const userData = useSelector((state) => state.Auth.userdata);
  const [blogs,setBlogs]=useState(0);
  const [email,setEmail]=useState(""); 
  const [image,setImage]=useState("");
  // Determine if the logged-in user is the author of the post
  const [isAuthor, setIsAuthor] = useState(false);
  useEffect(() => {
    if (slug) {
      appwriteServices.getPost(slug).then(async (post) => {
        if (post){ setPost(post);
          console.log(post);
          const user=await appwriteServices.getUser(post.User_ID);
         setBlogs(user.Blogs);
         setEmail(user.email);
         setImage(user.Image);
          const currUser=await authservice.getuser();
          if(currUser.$id===user.$id)setIsAuthor(true);
          setUsername(user.Username);
        }
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = async () => {
    const status = await appwriteServices.deletePost(post.$id);
    if (status) {
      if(post.Image) await appwriteServices.deletefile(post.Image);
      let newBlogs=blogs;
     if(newBlogs>0)newBlogs--;
     setBlogs(newBlogs);
      await appwriteServices.updateUser(post.User_ID,username,image,newBlogs,email);
      navigate("/");
    }
  };
  return post ? (
    <div className="bg-gray-50 py-12 min-h-screen">
      <Container>
        <div
          className={`max-w-6xl mx-auto flex flex-col ${
            post.Image ? "md:flex-row gap-10" : ""
          }`}
        >
          {/* Left: Content */}
          <div className={`${post.Image ? "flex-1" : "w-full"}`}>
            {/* Title + Meta */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-snug">
              {post.title}
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Written by{" "}
              <span className="font-medium text-gray-700">
                {username}
              </span>{" "}
              · {new Date(post.$createdAt).toDateString()}
            </p>
            {/* Content */}
            <div className="prose prose-lg prose-indigo max-w-none mb-6">
              {parse(post.Content)}
            </div>
            {/* Edit/Delete Buttons for Author */}
            {isAuthor && (
              <div className="mt-6 flex gap-4">
                <Button
                  onClick={deletePost}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Right: Image (only if present) */}
          {post.Image && (
            <div className="md:w-1/2">
              <img
                src={appwriteServices.getfileUrl(post.Image)}
                alt={post.title}
                className="w-full h-full max-h-[600px] object-cover rounded-xl"
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}
