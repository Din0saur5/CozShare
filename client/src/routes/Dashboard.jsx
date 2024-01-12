/* eslint-disable react-hooks/rules-of-hooks */
import  { useCallback, useEffect, useState } from 'react'
import {  useNavigate, useOutletContext } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import AOS from 'aos';
const Dashboard = () => {
   const [userData, setUserData] = useOutletContext()
   if (userData){
   const [userDataO, setUserDataO] = useState(userData)
   const [posts, setPosts] = useState([]);
   const [isFetching, setIsFetching] = useState(false);
   const [hasMorePosts, setHasMorePosts] = useState(true);
  

    const fetchPosts = async (limit, offset) => {
      const server = import.meta.env.VITE_BACK_END_SERVE;
  
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

    </div>
      <Sidebar userData={userDataO} setUserData={setUserDataO} setUserDataHO={setUserData} />
      </>
  )
} else{
  location.reload()
}
}
export default Dashboard
