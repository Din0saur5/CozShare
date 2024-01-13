/* eslint-disable react-hooks/rules-of-hooks */
import  { useCallback,  useEffect, useState } from 'react'

import Sidebar from '../components/Sidebar'
import AOS from 'aos';
import { useUserContext } from '../components/UserContext';
const Dashboard = () => {
  //  const navigate = useNavigate()
   const {userData, setUserData} = useUserContext()
  console.log(userData)
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  
  

    const fetchPosts = async (limit, offset) => {
      const server = import.meta.env.VITE_URL;
  
      setIsFetching(true);
      try {
        const response = await fetch(`${server}/feed/${userData.id}?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(prevPosts => [...prevPosts, ...data]);
  
        setHasMorePosts(data.length === limit);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsFetching(false);
      }
    };
  console.log(posts)
    useEffect(() => {
      fetchPosts(10, 0);
    }, []);
  
  

    useEffect(() => {
      AOS.init({ duration: 1000, once: true });
      
      

    }, []);
  
    const loadMoreOnScroll = useCallback(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasMorePosts && !isFetching) {
        fetchPosts(6, posts.length);
      }
    }, [posts.length, hasMorePosts, isFetching]);
  
    useEffect(() => {
      window.addEventListener('scroll', loadMoreOnScroll);
      return () => window.removeEventListener('scroll', loadMoreOnScroll);
    }, [loadMoreOnScroll]);
  

  return (
    <>
    <div className='fixed z-0 h-full w-full bg-primary'>

    </div>{userData &&(
      <Sidebar userData={userData} setUserData={setUserData}  />
    )}</>
  )
// } else{
//   navigate('/')
// }
}
export default Dashboard
