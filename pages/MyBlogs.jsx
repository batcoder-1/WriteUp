import react, { useEffect } from 'react'
import Container from "../src/components/Container";
import Card from '../src/components/Card';
import appwriteServices from "../src/appwrite/configure"
import { useSelector, useDispatch } from 'react-redux';
import authservice from '../src/appwrite/auth';
import { login } from '../src/store/AuthSlice';

function MyBlogs() {
    const [posts, setPosts] = react.useState([]);
    const [loading, setLoading] = react.useState(true);
    const dispatch = useDispatch();
    let userid = useSelector((state) => state.Auth.userdata.$id);

    useEffect(() => {
        async function fetchUserId() {
            try {
                const res = await authservice.getuser();
                if (res) {
                    dispatch(login(res));
                    userid = res.$id;
                }
            } catch (error) {
                throw error;
            }
        }
        fetchUserId();

        async function fetchUserposts() {
            const res = await appwriteServices.getUserposts(userid);
            if (res) setPosts(res.documents);
            setLoading(false);
        }
        if (userid) fetchUserposts();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-[70vh] flex justify-center items-center bg-gray-50">
                <p className="text-lg font-medium text-gray-600 animate-pulse">
                    Loading...
                </p>
            </div>
        )
    }
    if (posts.length === 0) {
        return (
            <div className="w-full h-[70vh] flex flex-col justify-center items-center bg-gray-50">
                <p className="text-xl font-semibold text-gray-700">
                    No posts found
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    Start writing to see your blogs here 
                </p>
            </div>
        )
    }

    return (
        <div className="w-full py-10 bg-gray-50 min-h-screen">
            <Container>
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    My Blogs
                </h1>
                <div className="flex flex-wrap -m-2">
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
                        >
                            <Card {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
export default MyBlogs
