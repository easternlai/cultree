import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFeedEventsStart } from '../../redux/eventsFeed/eventsFeedActions';
import EventDialog from '../EventDialog/EventDialog';


const EventsFeed = ({ user, feedEvents, fetching, fetchFeedEventsStart, socket }) => {
    useEffect(() => {
        fetchFeedEventsStart(user.token);
    }, [fetchFeedEventsStart])
    return (
        <div className="feed">
            <div className="feed-wrapper">
                <div className="feed__header-wrapper">
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
                <div className="feed__body-wrapper">
                    {feedEvents && feedEvents.map((event, idx) => (
                        <div className="feed-events-wrapper">
                            <EventDialog eventData={event} eventId={event._id} key={idx} socket={socket}/>
                        </div>
                    ))}
                </div>

            </div>


        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    feedEvents: state.eventsFeed.events,
    fetching: state.eventsFeed.fetching,
    socket: state.socketConnect.socket

});

const mapDispatchToProps = (dispatch) => ({
    fetchFeedEventsStart: (authToken) => dispatch(fetchFeedEventsStart(authToken)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventsFeed);
