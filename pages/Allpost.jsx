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
        })
        setLoading(false);
    },[]);
    if(loading){
        return(
            <>
            <div>Loading...</div>
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