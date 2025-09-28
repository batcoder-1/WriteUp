import React,{useState,useEffect} from "react";
import Container from "../src/components/Container";
import Card from "../src/components/Card";
import appwriteServices from "../src/appwrite/configure"

function Allpost(){
    const [posts,setPosts]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        appwriteServices.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents);
            }
            setLoading(false);
        })
    },[]);
    if(loading){
        return(
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
        )
    }
return(
    <>
     <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Card {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    </>
)
}
export default Allpost;