import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { fetchFeedEventsStart } from "../../redux/eventsFeed/eventsFeedActions";
import EventDialog from "../EventDialog/EventDialog";
import { FiLoader } from "react-icons/fi";
import spinner from "../../images/spinner1.gif";

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

  if (fetching) {
    return (
    <div className="spinner-wrapper">
      <img src={spinner} className="spinner-1 " />
    </div>)

  }

  return (
    <div className="feed layout-w-sidebar__center">
      {/* <div className="feed-sort heading-3">
        <div className="feed-sort--options">Upcoming</div>
        <div className="feed-sort--options">Attending</div>
        <div className="feed-sort--options">Past</div>
        <div className="feed-sort--options">All</div>
      </div> */}

      <div className="feed-event__wrapper">
        {feedEvents &&
          feedEvents.map((event, idx) => (
            <Fragment>
              <EventDialog
                eventData={event}
                participantsListCount={event.participantsList.length}
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
