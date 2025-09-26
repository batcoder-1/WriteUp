import React,{useState,useEffect} from "react";
import Container from "../src/components/Container";
import PostForm from "../src/components/PostForm"; 
import appwriteServices from "../src/appwrite/configure"
import { useNavigate, useParams } from "react-router-dom";
function Editpost(){
    const [post,setPost]=useState([]);
    const {slug}= useParams()// getting slug from URL
    const navigate=useNavigate();
    useEffect(()=>{
        if(slug){
            appwriteServices.getPost(slug).then((post)=>{
                if(post){
                    setPost(post);
                }
            })
        }
        else{
            navigate("/");
        }
    },[slug,navigate]);
return(
    <>
 <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
    </>
)
}
export default Editpost