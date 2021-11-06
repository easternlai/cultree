import React, { useEffect, useReducer } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import NavBar from "../../components/NavBar/NavBar";
import { getEvent } from "../../services/eventServices";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { EventPageReducer } from "./eventPageReducer";
import { attendEvent } from "../../services/eventServices";
import SettingsLogout from "../../components/SettingsLogout/SettingsLogout";

const EventPage = ({ token, currentUser }) => {
  const { eventId } = useParams();

  const [state, dispatch] = useReducer(EventPageReducer);

  let eventData = undefined;

  let fetching = state ? state.fetching : true;

  useEffect(() => {
    (async function () {
      if (!state) {
        eventData = await getEvent(eventId, token);
        dispatch({ type: "FETCH_EVENT_SUCCESS", payload: { eventData } });
      }
    })();
  });
  console.log(state);

  const handleAttendeeUpdate = () => {
    console.log("test");
    dispatch({
      type: "ADD_ATTENDEE",
      payload: { attendeeId: currentUser._id },
    });
    attendEvent(eventId, token);
  };

  return (
    <div className="body-container eventpage">
      <NavBar />
      <div className="eventpage-center">
        <Link className="eventpage-center-back" to="/">
          <IoMdArrowRoundBack className="eventpage-center-back__icon" />
          <span className="eventpage-center-back__text">Back to Events</span>
        </Link>
        {!fetching && (
          <div className="eventpage-center-content">
            <div className="eventpage-center-content__title">
              {state.data.name}
            </div>
            <div className="eventpage-center-content__caption">
              {state.data.caption}
            </div>
            <img
              className="eventpage-center-content__image"
              src={state.data.image}
            />
            <div className="eventpage-center-content-attend">
              <div className="eventpage-center-content-attend__count heading-3">
                {state.data.participantsList.length}{" "}
                {state.data.participantsList.length == 1 ? (
                  <span>attendee</span>
                ) : (
                  <span>attendees</span>
                )}
              </div>
              <div
                className="eventpage-center-content-attend__button"
                onClick={handleAttendeeUpdate}
              >
                {!state.data.participantsList.find(
                  (participant) => participant.attendee == currentUser._id
                ) ? (
                  <span>Attend</span>
                ) : (
                  <span>Unattend</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div class="eventpage-sidebar">
        <SettingsLogout />
        {!fetching &&
          <div className="eventpage-sidebar-body heading-3 ">
            <div>{state.data.location}</div>
            <div>{state.data.date}</div>
            <div>{state.data.time}</div>
            <div className="heading-5">
              <span>Organized by a </span>
              <span className="bold">{state.data.organizer.fullName}</span>
            </div>
            <div className="bold">Attendees</div>
            {state.data.participantsList.map((participant)=><div>{participant.attendee}</div>)}
          </div>
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(EventPage);
