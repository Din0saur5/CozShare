/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SearchBar({follows}) {
  const navigate = useNavigate()
    const [searchVal, setSearchVal] = useState('');
    const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchVal(newValue)
    
    if (!newValue) {
      setSuggestions([]);
      return;
    }
    if (follows.length >0){
    const filteredSuggestions = follows.filter(follow => {
     return follow.display_name.toLowerCase().includes(newValue.toLowerCase())}
    );
    setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/profile/${suggestion.id}`)
    setSuggestions([]);

  };

    
    return (
        <form>   
        <label htmlFor="search" className="mb-2 text-sm font-medium sr-only ">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" value={searchVal} onChange={handleChange} id="search" className="block rounded w-full p-4 ps-10 text-sm " placeholder="Search" required/>
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
            {suggestions.length > 0 && (
        <ul className="absolute z-50 border border-gray-400 bg-white w-3/4 rounded mt-0 p-0">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 flex flex-row cursor-pointer hover:bg-secondary"
            ><div className="avatar hover:bg-transparent ">
            <div className="w-8 mask mask-hexagon hover:bg-transparent">
                <img src={suggestion.profile_pic} />
            </div>
            </div>
            <div className='hover:bg-transparent'>
              {suggestion.display_name}
              </div>
            </li>
          ))}
        </ul>
      )}
        </div>
    </form> 
    );
  }
  export default SearchBar