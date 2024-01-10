/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState } from 'react'

import Datepicker from "tailwind-datepicker-react"
import { createPost } from './CreatePost'
import Toast from './Toast'
const PostCreateForm = ({userData, SetUserData, list, setEventList}) => {

    const server = import.meta.env.VITE_URL

    const [loading, setLoading] = useState(false)
    const [toastVisible,setToastVisible] = useState(false)
    const [mediaSrc, setMediaSrc] = useState([])
    const [show, setShow] = useState(false)
    const [step, setStep] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [currentInput, setCurrentInput] = useState('');
    const [caption, setCaption] = useState('');
    const [postType, setPostType] = useState(0);

    const handlePostTypeChange = (event) => {
        setPostType(+event.target.value);
    };
    function convertYouTubeUrlToEmbedUrl(url) {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
    
        if (match && match[2].length === 11) {
            
            return `https://www.youtube.com/embed/${match[2]}`;
        } else {
            
            return null;
        }
    }
    
    const handleMediaSrcInput = (e) => {
        setCurrentInput(e.target.value);
        
    }
    const handleAddItem = (e) => {
        e.preventDefault()
        
        if (mediaSrc < 2 ){

            if (currentInput.trim() !== '') {
            setMediaSrc([...mediaSrc, convertYouTubeUrlToEmbedUrl(currentInput)]);
            setCurrentInput('');  // Clear the input field after adding
            
        }
        if (mediaSrc.includes(null)){
            setMediaSrc([])
        }
    
    } 
       
    };
    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    };

    const chooseMedia = () => {
      if (postType === 1){
              return  (<div>
                
                <iframe  className="w-full aspect-video" src={mediaSrc[0]}  allowfullscreen></iframe>
               
                    <label>YouTube URL:
                        <input className='input input-primary mx-4 mt-4 ' type="text" name="youtubeUrl" value={currentInput} onChange={handleMediaSrcInput}/>
                    </label>{ mediaSrc.length<1?
                    (<button className='btn btn-primary btn-sm mt-4 '  onClick={(e)=>handleAddItem(e)}>Add</button>):(
                       <>
                        <button className='btn btn-secondary btn-sm mt-4 '  onClick={(e)=>{ e.preventDefault(); setMediaSrc([])}}>Clear</button>
                        <button className='btn btn-primary btn-sm mt-4' onClick={()=>{setStep(3)}}>Next</button>
                        </>
                    )
                    }
                </div>)
      } else if (postType === 2){
             return   (<div>
                    <label>Image:
                        <input type="file" name="image" accept="image/*" />
                    </label>
                    {/* Add other fields specific to Image post */}
                </div>)
      }
    }
    



  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-accent" onClick={()=>setShowModal(true)}>Create New Post</button>
        <dialog id="createPost" className={`modal ${showModal? 'modal-open':''}`}>
        <div className="modal-box">
            <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={()=>setShowModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <ul className="steps">
            <li className="cursor-pointer step step-primary" onClick={()=>{setStep(1)}}>Post Type</li>
            <li className={`cursor-pointer step ${step > 1? 'step-primary':''}`} onClick={()=>{setStep(2)}} >Choose Media</li>
            <li className={`cursor-pointer step ${step > 2? 'step-primary':''}`} onClick={()=>{setStep(3)}}>Caption</li>
            <li className={`cursor-pointer step ${step > 3? 'step-primary':''}`} onClick={()=>{setStep(4)}}>Finalize and Post</li>
            </ul>

            <form className='flex flex-col align-center items-center'>
            {step === 1? (
                <>
                <div  className='mb-4'>
                    <label>
                        <input
                            className='mr-2'
                            type="radio"
                            value= {1}
                            name="postType"
                            onChange={handlePostTypeChange}
                        />
                        YouTube Video
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            className='mr-2'
                            type="radio"
                            value={2}
                            name="postType"
                            onChange={handlePostTypeChange}
                        />
                        Image Upload
                    </label>
                </div>
                <button className='btn btn-primary btn-sm mt-4 text-base-100' onClick={()=>setStep(2)}>next</button>
                </>
            ):(<></>)}{
            step === 2?
                chooseMedia():(<></>) 
            }{
                step === 3?
                    ( <div>
                        <label htmlFor="caption">Caption:</label>
                        <input 
                            className='input input-primary mx-4 mt-4 '
                            type="text" 
                            id="caption" 
                            value={caption} 
                            onChange={handleCaptionChange}
                        />
            
                        <button className='btn btn-primary btn-sm mt-4 ' onClick={()=>setStep(4)}>Next</button>
                    </div>):(<></>) 
                }{
                    step === 4?
                        (
                        <div className="card card-compact w-96 bg-base-100 shadow-xl">
                            <div className='flex flex-row bg-primary w-full py-2 rounded-t-xl'>
                            <div className="avatar hover:bg-transparent ml-4">
                            <div className="w-8 mask mask-hexagon hover:bg-transparent">
                                <img src={userData.profile_pic} />
                            </div>
                            </div>
                            <div className='hover:bg-transparent text-base-100 line-clamp-1 ml-4 mt-1'>
                            {userData.display_name}
                            </div>
                            </div>
                            {postType === 1? (
                               <figure> <iframe  className="w-full aspect-video" src={mediaSrc[0]}  allowfullscreen></iframe>
                            </figure>
                            ):(
                                <>
                                <figure>
                                    <div className="carousel w-full">
                                    <div id="item1" className="carousel-item w-full">
                                        <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
                                    </div> 
                                    <div id="item2" className="carousel-item w-full">
                                        <img src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
                                    </div> 
                                    <div id="item3" className="carousel-item w-full">
                                        <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                                    </div> 
                                    <div id="item4" className="carousel-item w-full">
                                        <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
                                    </div>
                                    </div> 
                                    </figure>
                                    <div className="flex justify-center w-full py-2 gap-2">
                                    <a href="#item1" className="btn btn-xs">1</a> 
                                    <a href="#item2" className="btn btn-xs">2</a> 
                                    <a href="#item3" className="btn btn-xs">3</a> 
                                    <a href="#item4" className="btn btn-xs">4</a>
                                    </div>
                                </>
                            )}
                                
                        <div className="card-body">
                            {/* <h2 className="card-title">{caption}</h2> */}
                            <p>{caption}</p>
                            <div className="card-actions justify-end">
                            <button className=" disabled btn btn-link">view/add comments</button>
                            </div>
                        </div>
                        </div>
                           

                        ):(<></>) 
                    }
            
            
            
            
            
            </form>
            
            
        </div>
        </dialog>
        <Toast message={'New Post successfully created!'} isVisible={toastVisible} onClose={()=>setToastVisible(false)} />
    </div>
  )
}

export default PostCreateForm

