import React, {Fragment} from 'react';
import EventsFeed from '../../components/EventsFeed/EventsFeed';
import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';

const HomePage = () => {
    return (
        <Fragment>
            <body className="body-container">
                <NavBar />
                <EventsFeed />
                <SideBar />
                
            </body>
        </Fragment>
    )
}

export default HomePage;
