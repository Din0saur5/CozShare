/* eslint-disable react/prop-types */

import Feed from '../components/Feed';
import PopularEvents from './PopularEvents';
import PopularPosts from './PopularPosts';
const ExploreLayout = ({activeTab, userData}) => {
    switch(activeTab){

        case 'Following Feed':
            return(
                <>
                    <Feed userData={userData}/>
                </>
            )
        case 'Popular Posts':
            return(
                <> 
                    <PopularPosts userData={userData}/> 
                </>
            )


        case 'Popular Events':

            return(
                <>
                <PopularEvents userData={userData}/>


                </>
            )
    }


}

export default ExploreLayout