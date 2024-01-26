/* eslint-disable react/prop-types */
import  { useCallback, useEffect, useState } from 'react'
import AOS from 'aos';
import PostRow from './PostRow';

const Feed = ({userData}) => {
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
          <div className='ml-4 mr-4'>
            <div  className='grid-fix grid md:grid-cols-2 lg:grid-cols-1  xl:grid-cols-2 2xl:grid-cols-3 overflow-x-hidden'>
              {posts? (posts.map(post=>{
                  return <PostRow  key={post.id} post={post} currentUser={userData.id} list={posts} setList={setPosts}/>
              })
                ):(<></>)
                }
            </div>
               {posts.length > 0? (<></>):( <div style={{textShadow: "0 0 15px #a991f7 , 0 0 15px #fff "}} className=" divider divider-secondary items-center ">no posts, try following more people!</div>)}
          </div>
        
      
    </>
  )
}

export default Feed
