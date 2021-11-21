import React, { useEffect, useReducer, useRef, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { attendEvent } from "../../services/eventServices";
import AttendButton from "../Buttons/AttendButton";
import { EventDialogReducer, INITIAL_STATE } from "./eventDialogReducer";

const EventDialog = ({
  eventData,
  eventId,
  key,
  token,
  currentUser,
  socket,
  participantsListCount,

}) => {
  const [state, dispatch] = useReducer(EventDialogReducer, INITIAL_STATE);
  useEffect(() => {
    if (eventData) {
      dispatch({ type: "FETCH_EVENT_SUCCESS", payload: { eventData } });
    }
  }, [eventId, eventData, participantsListCount]);

  const handleAttendeeUpdate = async () => {
    dispatch({
      type: "ADD_ATTENDEE",
      payload: { attendeeId: currentUser._id },
    });
    attendEvent(eventId, token);
  };

  return (
    <div className="event">
      <div className="event__icon">
        <span className="event__icon--initials">
          {eventData.organizer.fullName[0]}
        </span>
      </div>
      <div className="event__dialog">
        <div className="event__dialog--date heading-4">
          {eventData.date}
          {eventData.time && <span> @{eventData.time && eventData.time}</span>}
        </div>
        <div className="event__dialog__heading">
          <div className="event__dialog__heading--name heading-3__bold">
            {eventData.name}
          </div>
          <div className="event__dialog__heading--type heading-4__bold">
            {eventData.type}
          </div>
        </div>
        <Link to={`/event/${eventId}`} className="event__dialog__info no-dec">
          <div className="heading-4">{eventData.caption}</div>
          <div className="heading-5">
            <span>created by </span>
            <span className="heading-5__bold">
              {eventData.organizer.fullName}
            </span>
          </div>
        </Link>
        {eventData.image && <img src={eventData.image} className="event__dialog--image" />}
        <div className="event__dialog__attendees heading-4">
          <div className="event__dialog__attendees--count">
            {state.data.participantsList.length}{" "}
            {state.data.participantsList.length == 1 ? (
              <span>attendee</span>
            ) : (
              <span>attendees</span>
            )}
          </div>

          <AttendButton handleAttendeeUpdate={handleAttendeeUpdate} attended={!state.data.participantsList.find(
              (participant) => participant.attendee == currentUser._id
            )}/>

        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(EventDialog);
