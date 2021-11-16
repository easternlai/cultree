import React, {Fragment} from 'react';
import EventsFeed from '../../components/EventsFeed/EventsFeed';
import NavBar from '../../components/NavBar/NavBar';
import Announcements from '../../components/Announcements/Announcements';
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <Fragment>
                <EventsFeed />
                <Announcements />
        </Fragment>
    )
}

export default HomePage;
