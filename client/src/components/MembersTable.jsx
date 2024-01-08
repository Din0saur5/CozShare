import AOS from "aos"
import { useEffect } from "react"
import UserRow from "./UserRow"


const MembersTable = ({memberList, userData, setUserData, viewedProfile, setMemberList}) => {
    useEffect(()=>{ 
        AOS.init({
            once: true, // whether animation should happen only once - while scrolling down
            useClassNames: true, // if true, will add content of `data-aos` as classes on scroll
            initClassName: false, // disable initialization classes
            animatedClassName: 'animated', // class applied on animation
            disable: "mobile"
          })},[])
  return (
    <div  className="h-full overflow-x-auto ">
  
    {/* head */}
    <div style={{textShadow: "0 0 15px #e3d2de , 0 0 15px #e3d2de "}} className=" divider divider-secondary ">Members {memberList.length}</div>
    
    <div className='grid md:grid-cols-2 lg:grid-cols-1  xl:grid-cols-2 2xl:grid-cols-3 overflow-x-hidden'>
    {// eslint-disable-next-line react/prop-types
    memberList? (memberList.map(user=>{ 
        return <UserRow  key={user.id} user={user} currentUser={userData} setList={setMemberList} list={memberList} table={'members'} setCurrentUserData={setUserData} viewedProfile={viewedProfile.id}/>
    })
      ):<small>no followers</small>
}
    </div>
   
    
 
</div>
  )
}

export default MembersTable
