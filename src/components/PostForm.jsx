import React, { useCallback, useEffect,useState } from "react";
import Button from "./Button";
import Input from "./Input";
import RTE from "./RTE";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import appwriteServices from "../appwrite/configure";
import authservice from "../appwrite/auth";
import Select from "./Select";
import { useNavigate } from "react-router-dom";

function PostForm({ post }) {
  const [loading, setLoading] =useState(false);
  const { watch, control, handleSubmit, register, getValues, setValue, reset } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        category: post?.category || "",
      },
    });

  const navigate = useNavigate();
  const userdata = useSelector((state) => state.Auth.userdata);
  // console.log(userdata);
  const slugtransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugtransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, slugtransform]);
  const submit = async (data) => {
    setLoading(true);
  // console.log(data);

  let file = null;
  if (data.image && data.image[0]) {
    file = await appwriteServices.uploadFile(data.image[0]);
  }

  if (post) {
    // Update existing post
    const dbpost = await appwriteServices.updatePost(post.$id, {
      Title: data.title,
      Content: data.content,
      Status: data.status,
      Image: file ? file.$id : post.Image,   // keep old image if no new one
      User_ID: userdata.$id,
    });

    if (dbpost) {
      navigate(`/post/${dbpost.$id}`);
    }

  } else {
    // Create new post
    const dbpost = await appwriteServices.createPost({
      Title: data.title,
      Content: data.content,
      Status: data.status,
      Image: file ? file.$id : null,
      User_ID: userdata.$id,
      Slug: data.slug,
    });
   const usedata=await authservice.getuser();
   const id=usedata.$id;
   const userinfo=await appwriteServices.getUser(id);
   let blogs=userinfo.Blogs;
   const name=userinfo.Username;
   const email=userinfo.email;
   const image=userinfo.Image;
   blogs++;
  await appwriteServices.updateUser(id,name,image,blogs,email);
    if (dbpost) {
      navigate(`/post/${dbpost.$id}`);
    }
  }
setLoading(false);
};
if(loading){
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
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugtransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteServices.getfileUrl(post.image)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
