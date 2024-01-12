/* eslint-disable react/prop-types */

import { GrClose } from "react-icons/gr";
import CommentTable from "./CommentTable";
import { useState } from "react";
const PostRow = ({currentUser, post, list, setList}) => {
  const [commentsOpen, setCommentsOpen] = useState(false)

  function extractImageName(url) {
    const baseUrl = 'https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/posts/';
    if (url.startsWith(baseUrl)) {
        return url.slice(baseUrl.length);
    } else {
        return url
    }
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

  const server = import.meta.env.VITE_URL;
  const imagePost = () => {
    if(post.media.length > 1){
      return(
      <>
          <div className="carousel w-full ">
              
              { post.media.map((img)=>{
                      return (<div key={extractImageName(img)} id={`${extractImageName(img)}`} className="carousel-item w-full">
                                  <img src={img} alt={`${extractImageName(img)}`}  className="w-full aspect-3/2 object-contain" />
                              </div> )
                  })}
          </div>
          <div className="flex justify-center w-full py-2 gap-2">
              { post.media.map((img, index)=>{
                      return <a key={extractImageName(img)} href={`#${extractImageName(img)}`} className="btn btn-xs">{index+1}</a>
                  })}
                  
          </div>
      </>
    )} else{
      return(
      <div className="w-full">
          <figure>
          <img src={post.media[0]} alt={`${extractImageName(post.media[0])}`} className="w-full aspect-3/2 object-contain" />
          </figure>

      </div>
    )}
  }

  const deletePost = (postId) => {
    const url = `${server}/post_delete/${postId}`; // Replace with your actual server URL

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include' // Include credentials like cookies, authorization headers, etc., if needed
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.error || 'Unknown error occurred');
            });
        } 
    
        setList(list.filter(post => post.id !== postId))
    })
    .catch(error => {
        console.error('Error:', error.message);
        // Handle error here (e.g., show error message to user)
    });
}
  
const lightboxMedia = () => {
  if (post.post_type === 2) { 

    if(post.media.length > 1){
      return(
      <>
          <div className="carousel w-full ">
              
              { post.media.map((img)=>{
                      return (<div key={extractImageName(img)} id={`${extractImageName(img)}modal`} className="carousel-item w-full">
                                  <img src={img} alt={`${extractImageName(img)}`}  className="w-full md:aspect-3/2 object-contain" />
                              </div> )
                  })}
          </div>
          <div className="flex justify-center w-full py-2 gap-2">
              { post.media.map((img, index)=>{
                      return <a key={extractImageName(img)} href={`#${extractImageName(img)}modal`} className="btn btn-xs">{index+1}</a>
                  })}
                  
          </div>
      </>
    )} else{
      return(
      <div className="w-full">
          <figure>
          <img src={post.media[0]} alt={`${extractImageName(post.media[0])}`} className="w-full md:aspect-3/2 object-contain" />
          </figure>

      </div>
    )}
  } else{
    return(
    <figure> 
      <iframe  className="w-full aspect-video mt-2" src={post.media[0]}  allowFullScreen></iframe>
    </figure>
  )}
}

  


  return (
    <>
    <div className="card card-compact mt-4 sm:w-96 bg-base-100 shadow-xl">
        <div className='flex flex-row bg-primary w-full py-2 rounded-t-xl'>
        <div className="avatar hover:bg-transparent ml-4">
        <div className="w-8 mask mask-hexagon hover:bg-transparent">
            <img src={post.user.profile_pic} />
        </div>
        </div>
        <div className='hover:bg-transparent text-base-100 line-clamp-1 ml-4 mt-1'>
        {post.user.display_name}
        </div>
        { currentUser === post.user_id && (<div className="flex flex-row-reverse w-9/12 px-2">
        <button onClick={()=>{deletePost(post.id)}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-100"><GrClose /></button>
        </div>)}
        </div>
        {post.post_type === 1? (
        <figure> <iframe  className="w-full aspect-video" src={post.media[0]}  allowFullScreen></iframe>
        </figure>
        ):(
            imagePost()
        )}
            
    <div className="card-body">
        
        <p>{post.caption}</p>
        <div className="card-actions justify-end">
        <button onClick={(e)=>{e.preventDefault(); setCommentsOpen(true); document.getElementById(post.id).showModal()}} className="btn btn-link">view/add comments</button>
        </div>
        <small className="italic text-slate-300">posted on: {formatTimestamp(post.created)} </small>
    </div>
    </div>
    <dialog id={post.id} className="modal">
      <div className="modal-box w-11/12 max-w-5xl flex flex-col ">
        <div className="mt-4">
        {lightboxMedia()}
        </div>
        <div className='flex flex-row bg-transparent w-full py-2 border-x border-third'>
        <div className="avatar hover:bg-transparent ml-4">
        <div className="w-8 mask mask-hexagon hover:bg-transparent">
            <img src={post.user.profile_pic} />
        </div>
        </div>
        <div className='hover:bg-transparent line-clamp-1 ml-4 mt-1'>
        {post.user.display_name}
        </div>
        </div>
        <p className=" border-third rounded-b border-b border-x pl-24 mb-4">&emsp;&emsp;{post.caption}</p>
        <CommentTable post={post} commentsOpen={commentsOpen} currentUser={currentUser}/>


        <div className="modal-action">
          <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
        </div>
      </div>
    </dialog>
</> 
  )
}

export default PostRow


// determine post type
//set up card based on post type
// make comment modal
//add routes to get and make comments
// useEffect to re run fetch