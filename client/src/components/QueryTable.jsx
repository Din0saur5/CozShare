/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import EventRow from "./EventRow"
import UserRow from "./UserRow"

const QueryTable = (props) => {
    const {query, tab, userData} = props
    console.log("line 7 querytable: ", userData)
    const server = import.meta.env.VITE_URL
    const queryf = query.replace(/%/g, ' ')
    const [queryList, setQueryList] = useState([{}])
    useEffect(()=>{
        const url = `${server}/search/${tab}`; 
        const data = { query: queryf };
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Search results:', data);
            setQueryList(data)
            // Process the data here
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    
    },[tab, queryf, server])

  if (queryList.length > 0){
    return(
        tab==='Users'?(
            queryList.map(user=>{ 
                return <UserRow  key={user.id} user={user} currentUser={userData} setList={setQueryList} list={queryList} table={'query'} />
            })
            

        ):(

        queryList.map(event=>{ 
            return <EventRow  key={event.id} event={event} /> 
        })
        

        )
    )
   
    } else{
        return <div style={{textShadow: "0 0 15px #a991f7 , 0 0 15px #fff "}} className=" divider divider-secondary  ">No {tab} Found</div>
    }
  

}

export default QueryTable
