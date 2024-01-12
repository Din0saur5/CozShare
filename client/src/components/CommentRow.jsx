/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const CommentRow = ({comment, currentUser}) => {
  return (
    <div className="mb-4 border-third border-b">
    <div className="bg-base-100 flex flex-row mt-2">
      <div className="avatar hover:bg-transparent ml-4">
        <div className="w-6 mask mask-hexagon hover:bg-transparent">
            <img src={comment.user.profile_pic} />
        </div>
        </div>
        <Link to={ comment.user_id === currentUser? '/profile': `/profile/${comment.user_id}`}>
        <div className='hover:bg-transparent line-clamp-1 ml-4 mt-0 underline mb-1'>
        {comment.user.display_name}
        </div>
        </Link>
     </div>
    <div className="ml-24 mb-2">
        {comment.comment}
    </div>
    </div>
  )
}

export default CommentRow
