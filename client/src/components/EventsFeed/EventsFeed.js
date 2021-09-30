import React from 'react';
import {AiOutlineSearch} from 'react-icons/ai'

const EventsFeed = () => {
    return (
        <div className="feed">
           <div className="feed-wrapper">
                <div className="feed-search-div">
                    <input className="feed-search-div__input" placeholder="Search for an event or activity...">
                    </input>
                </div>
                <div className="feed-sort-div heading-3">
                    <div className="feed-sort-div__items">Upcoming</div>
                    <div className="feed-sort-div__items">Bookmarked</div>
                    <div className="feed-sort-div__items">Surveys</div>
                    <div className="feed-sort-div__items">Past</div>
                    <div className="feed-sort-div__items">All</div>
                </div>
           </div>

        </div>
    )
}

export default EventsFeed;
