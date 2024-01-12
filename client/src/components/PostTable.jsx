/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react'
import AOS from 'aos';
import PostCreateForm from './PostCreateForm';
import PostRow from './PostRow';


const PostsTable = ({userData, setUserData, viewedProfile, type}) => {
    const [postList, setPostList] = useState([])
    
    useEffect(()=>{
        const server = import.meta.env.VITE_URL;
        if (type == 'user'){
          const config = {
              credentials: 'include',
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              }};
          fetch(`${server}/posts_by_user/${viewedProfile}`,config)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log(data)
              setPostList(data);
              
            })
            .catch(error => {
              console.error("Fetching data failed", error);
              // Handle the error state appropriately
              // e.g., set an error message state variable to display an error message
            })
    } else{
        const config = {
            credentials: 'include',
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }};
      fetch(`${server}/posts_by_event/${viewedProfile.id}`,config)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data)
          setPostList(data);
          
        })
        .catch(error => {
          console.error("Fetching data failed", error);
          // Handle the error state appropriately
          // e.g., set an error message state variable to display an error message
        })
    }




}   
    ,[viewedProfile, userData, type])
    
    const postAuth = () => {
        if (userData.id === viewedProfile){

            return(
                <div className='flex flex-row-reverse mr-2 mt-2'>
                    <PostCreateForm userData={userData} setUserData={setUserData} list={postList} setPostList={setPostList} viewedProfile={viewedProfile} />
                </div>
            )
        } else if ( type === 'event'){
          return(
            <div className='flex flex-row-reverse mr-2 mt-2'>
                <PostCreateForm userData={userData} setUserData={setUserData} list={postList} setPostList={setPostList} viewedProfile={viewedProfile} event={viewedProfile.id}/>
            </div>
        )
        } else {
            return <></>
        }
}
    useEffect(()=>{ 
    AOS.init({
        once: true, // whether animation should happen only once - while scrolling down
        useClassNames: true, // if true, will add content of `data-aos` as classes on scroll
        initClassName: false, // disable initialization classes
        animatedClassName: 'animated', // class applied on animation 1536px-1623px 
        disable: "mobile"
      })},[])
  return (
    <div  className="h-full overflow-x-auto ">
  
    {/* head */}
    <div style={{textShadow: "0 0 15px #a991f7 , 0 0 15px #fff "}} className=" divider divider-secondary  ">Posts {postList.length}</div>
    {postAuth()}

    <div  className='grid-fix grid md:grid-cols-2 lg:grid-cols-1  xl:grid-cols-2 2xl:grid-cols-3 overflow-x-hidden'>
    {postList? (postList.map(post=>{
        return <PostRow  key={post.id} post={post} currentUser={userData.id} list={postList} setList={setPostList}/>
    })
      ):<small>no posts</small>
}
    <div className="h-14 md:h-28 xl:hidden"></div>
    </div>
   
    
 
</div> 
  )
}

export default PostsTable
