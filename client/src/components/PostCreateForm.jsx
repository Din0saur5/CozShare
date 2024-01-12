/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState } from 'react'
import supabase from './supabaseClient'
import { createPost } from './CreatePost'
import Toast from './Toast'
import MediaUploader from './MediaUploader'
const PostCreateForm = ({userData, SetUserData, list, setPostList, event=null}) => {



    const [loading, setLoading] = useState(false)
    const [toastVisible,setToastVisible] = useState(false)
    const [mediaSrc, setMediaSrc] = useState([])
    const [step, setStep] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [currentInput, setCurrentInput] = useState('');
    const [caption, setCaption] = useState('');
    const [postType, setPostType] = useState(0);
    const [showUploader, setShowUploader] = useState(false);
    




    const handlePostTypeChange = (event) => {
        setPostType(+event.target.value);
    };
    function convertYouTubeUrlToEmbedUrl(url) {
        // eslint-disable-next-line no-useless-escape
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
        const handleUploaderOpen = (e) => {
            e.preventDefault()
            setShowUploader(true);
        };
           
        const handleMediaConfirm = (media) => {
            setMediaSrc([...mediaSrc, media]);
            setShowUploader(false);
            setCurrentInput('')
            document.getElementById('filePicker').value =''
        };
        const removeImg = (e, img) =>{
            e.preventDefault()
            setMediaSrc(mediaSrc.filter(imgE => imgE !== img))

        }

      if (postType === 1){
              return  (<div>
                
                <iframe  className="w-full aspect-video" src={mediaSrc[0]}  allowFullScreen></iframe>
               
                    <label>YouTube URL:
                        <input className='input input-primary mx-4 mt-4 ' type="text" name="youtubeUrl" value={currentInput} onChange={handleMediaSrcInput}/>
                    </label>{ mediaSrc.length<1?
                    (<button className='btn btn-primary btn-sm mt-4 shadow-inner shadow-white text-white'  onClick={(e)=>handleAddItem(e)}>Add</button>):(
                       <>
                        <button className='btn btn-secondary btn-sm mt-4 mr-1 shadow-inner shadow-white text-white'  onClick={(e)=>{ e.preventDefault(); setMediaSrc([])}}>Clear</button>
                        <button className='btn btn-primary btn-sm mt-4 shadow-inner shadow-white text-white' onClick={()=>{setStep(3)}}>Next</button>
                        </>
                    )
                    }
                </div>)
      } else if (postType === 2){
             return   (
                <div>
                    { !!mediaSrc.length &&  (mediaSrc.map(img =>{
                        console.log(mediaSrc)
                        return (
                        <div key={img.name} className='flex flex-row mb-2'>
                        <p className='text-secondary italic'>{img.name}</p>
                        <button onClick={(e)=>{removeImg(e, img)}} className='bg-error rounded-lg btn btn-xs px-1 text-xs ml-2'>remove</button>
                        </div>
                        )
                    })
                            )
                         
                    }

                    
                    <input className="file-input file-input-bordered file-input-sm w-full max-w-xs" onChange={handleFileChange} type="file" name="image" accept="image/*" id='filePicker' />
                    <button onClick={(e)=>{handleUploaderOpen(e)}} className={`btn btn-accent btn-sm mt-2 ${currentInput === ""? 'btn-disabled':'' }` }>Edit & Add</button>
                    <br/>
                    <small>Add images one at a time but up to 10 total</small>
                    {mediaSrc.length > 0 && ( 
                    <div className='flex flex-row-reverse'>
                        <button className=' btn btn-primary btn-sm mt-4 ml-2 text-base-100 shadow-inner shadow-white' onClick={()=>{setStep(3)}}>Next</button>
                    </div>
                    )}
                    {showUploader? (<MediaUploader visible={showUploader} setVisible={setShowUploader} imgSrc={currentInput} handleMediaConfirm={handleMediaConfirm} />):(<></>)}
                </div>)
      }
    }
    
    async function uploadFile(file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${file.name.split('.').shift()}${Math.random()}.${fileExt}`;

        const fileBlob = await getBlobFromUrl(file.url)


        const { data, error } = await supabase.storage.from('posts').upload(fileName, fileBlob);
    
        if (error) {
            throw error;
        }
        return data;
    }
    async function getBlobFromUrl(blobUrl) {
        try {
          const response = await fetch(blobUrl);
          const fileBlob = await response.blob();
          return fileBlob;
        } catch (error) {
          console.error('Error fetching the Blob:', error);
          return null; // or handle the error as needed
        }
      }
      

     

    const mediaFormatterAndPost = async (e) => {
        e.preventDefault()
        setLoading(true)
       
        console.log('clicked')
       if (postType === 1){     
        try {
            const data = await createPost(userData.id, 1, mediaSrc, caption, event);
            setPostList([data, ...list])
            // Handle the data or further actions here
        } catch (error) {
            console.error('Error creating post:', error);
            // Handle the error appropriately
        }
        
       } else if (postType === 2){
                const finalURLArray = await Promise.all(mediaSrc.map(async (img) => {
                    try {
                        const uploadedImage = await uploadFile(img);
                        const url = `https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/${uploadedImage.fullPath}`;
                        return url;
                    } catch (error) {
                        console.error('Error in uploading file:', error);
                        return null; // Return null or handle error as needed
                    }
                }));
            
                console.log(finalURLArray);
                
               const data = await createPost(userData.id, 2, finalURLArray, caption, event);
                setPostList([data, ...list])
        }  
        setLoading(false)
        clearForm() 
        setShowModal(false)
        setToastVisible(true)
       
    };
  
    const handleFileChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0];
        if (file && file.type.match('image.*')) {
            let photoData = {
                name: '',
                url: ''
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                photoData.url = e.target.result
                // setCurrentInput(e.target.result); // Update the profile_pic state with the file's data URL
            };
            reader.readAsDataURL(file);
            photoData.name = file.name // Store the selected file
            
            setCurrentInput(photoData)
            console.log(photoData)
        }
    };

  

    const imagePostPreview = () => {
      if(mediaSrc.length > 1){
        return(
        <>
            <div className="carousel w-full ">
                
                { mediaSrc.map((img, index)=>{
                        return (<div key={index} id={`item${index}`} className="carousel-item w-full">
                                    <img src={img.url} alt={img.name} className="w-full aspect-3/2 object-contain" />
                                </div> )
                    })}
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                { mediaSrc.map((img, index)=>{
                        return <a key={index} href={`#item${index}`} className="btn btn-xs">{index+1}</a>
                    })}
                    
            </div>
        </>
      )} else{
        return(
        <div className="w-full">
            <figure>
            <img src={mediaSrc[0].url} alt={mediaSrc[0].name} className="w-full  aspect-3/2 object-contain" />
            </figure>

        </div>
      )}
    }
    



const clearForm = () => {
  setMediaSrc([])
  setCaption('')
  setStep(1)
  setCurrentInput('')
  setPostType(0)

}




  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-accent" onClick={()=>setShowModal(true)}>Create New Post</button>
        <dialog id="createPost" className={`modal ${showModal? 'modal-open':''}`}>
        <div className="modal-box">
            <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={()=>{clearForm(); setShowModal(false)}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <ul className="steps">
            <li className="cursor-pointer step step-primary" onClick={()=>{setStep(1)}}>Post Type</li>
            <li className={`cursor-pointer step ${step > 1? 'step-primary':''}`} onClick={()=>{setStep(2)}} >Choose Media</li>
            <li className={`cursor-pointer step ${step > 2? 'step-primary':''}`} onClick={()=>{setStep(3)}}>Caption</li>
            <li className={`cursor-pointer step ${step > 3? 'step-primary':''}`} onClick={()=>{if(mediaSrc.length>0){setStep(4)}}}>Finalize and Post</li>
            </ul>

            <form onSubmit={(e)=>{mediaFormatterAndPost(e)}} className='flex flex-col align-center items-center'>
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
                <button className='btn btn-primary btn-sm mt-4 text-base-100 shadow-inner shadow-white ' onClick={()=>setStep(2)}>next</button>
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
            
                        <button className='btn btn-primary btn-sm mt-4 text-base-100 shadow-inner shadow-white ' onClick={()=>setStep(4)}>next</button>
                    </div>):(<></>) 
                }{
                    step === 4?
                        (
                        <>
                            <div className="card card-compact sm:w-96 bg-base-100 shadow-xl">
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
                                <figure> <iframe  className="w-full aspect-video" src={mediaSrc[0]}  allowFullScreen></iframe>
                                </figure>
                                ):(
                                    imagePostPreview()
                                )}
                                    
                            <div className="card-body">
                                {/* <h2 className="card-title">{caption}</h2> */}
                                <p>{caption}</p>
                                <div className="card-actions justify-end">
                                <button onClick={(e)=>{e.preventDefault()}} className=" disabled btn btn-link">view/add comments</button>
                                </div>
                            </div>
                            </div>
                            <div className='flex flex-row-reverse w-full mt-2'>
                                {loading? (
                                <button className="btn ">
                                    <span className="loading loading-spinner btn-success "></span>
                                    loading
                                </button>):(
                                <button type='submit' className='btn btn-success btn-sm text-base-100 shadow-inner shadow-white tracking-wide'>Post</button>
                                )}
                            </div>
                        </> 

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

