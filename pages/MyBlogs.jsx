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
