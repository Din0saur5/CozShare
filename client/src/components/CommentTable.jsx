/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import CommentRow from "./CommentRow";


const CommentTable = ({post, commentsOpen, currentUser}) => {
    const server = import.meta.env.VITE_URL;
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    useEffect(()=>{
        if (commentsOpen){
        fetch(`${server}/comments/${post.id}`)
        .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        })
        .then(comments => {
        console.log('Comments:', comments);
        setComments(comments)
        })
        .catch(error => {
        console.error('Error fetching comments:', error);
       
        });

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[commentsOpen])
    
const handleChangeComment = (e) => {
  setNewComment(e.target.value)
}

const newCommentSubmit = (e) => {
  e.preventDefault()
    const commentData ={
        comment: newComment
    }


  const config = {
    method: 'POST',
    credentials: 'include', 
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
    }

  fetch(`${server}/comments/${post.id}`, config)
        .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        })
        .then(comment => {
        console.log('Comment:', comment);
        setComments([comment, ...comments])
        setNewComment('')
        })
        .catch(error => {
        console.error('Error fetching comments:', error);
       
        });

}



  return (
    <>
        {!!comments && comments.map(comment=><CommentRow key={comment.id} comment={comment} currentUser={currentUser}/>)}    
    <div className=" sticky bottom-0 flex justify-center flex-row-reverse">
        <form onSubmit={(e)=>newCommentSubmit(e)} className="w-full">
            <input value={newComment} onChange={handleChangeComment} type="text" placeholder="Add a comment" className=" peer input border-base-200 border-r-transparent shadow-inner shadow-white border rounded-3xl w-11/12 " />
            <button type='submit' className="btn btn-primary rounded-3xl mt-4 mr-1 shadow-inner peer-focus:shadow-white  text-white absolute -ml-4 bottom-0"> post</button>
        </form>
    </div>
    </>
  )
}

export default CommentTable

//has to useeffect fetch comments and set the comments as a state
//avatar link to profile comment 