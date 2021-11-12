import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { fetchFeedEventsStart } from "../../redux/eventsFeed/eventsFeedActions";
import EventDialog from "../EventDialog/EventDialog";

const EventsFeed = ({
  user,
  feedEvents,
  fetching,
  fetchFeedEventsStart,
  socket,
}) => {
  useEffect(() => {
    fetchFeedEventsStart(user.token);
  }, [fetchFeedEventsStart]);
  return (
    <div className="feed layout-w-sidebar__center">
      <div className="feed-sort heading-3">
        <div className="feed-sort--options">Upcoming</div>
        <div className="feed-sort--options">Bookmarked</div>
        <div className="feed-sort--options">Surveys</div>
        <div className="feed-sort--options">Past</div>
        <div className="feed-sort--options">All</div>
      </div>
      <div className="feed-event__wrapper">
        {feedEvents &&
          feedEvents.map((event, idx) => (
            <Fragment>
              <EventDialog
                eventData={event}
                eventId={event._id}
                key={idx}
                socket={socket}
              />
            </Fragment>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  feedEvents: state.eventsFeed.events,
  fetching: state.eventsFeed.fetching,
  socket: state.socketConnect.socket,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFeedEventsStart: (authToken) =>
    dispatch(fetchFeedEventsStart(authToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsFeed);
