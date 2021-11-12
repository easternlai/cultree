import React, { useEffect, useReducer, useState, Fragment } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import NavBar from "../../components/NavBar/NavBar";
import { getEvent } from "../../services/eventServices";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { EventPageReducer } from "./eventPageReducer";
import { attendEvent, createComment } from "../../services/eventServices";
import SettingsLogout from "../../components/SettingsLogout/SettingsLogout";
import moment from "moment";
import AttendButton from "../../components/Buttons/AttendButton";

const EventPage = ({ token, currentUser }) => {
  const { eventId } = useParams();

  const [state, dispatch] = useReducer(EventPageReducer);
  const [message, setMessage] = useState("");

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

  const handleAttendeeUpdate = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_ATTENDEE",
      payload: {
        attendeeId: currentUser._id,
        username: currentUser.username,
        fullName: currentUser.fullName,
      },
    });
    attendEvent(eventId, token);
  };

  const handleComment = async (event) => {
    event.preventDefault();
    const comment = await createComment(eventId, token, message);
    console.log(comment);
    dispatch({ type: "CREATE_COMMENT", payload: { comment } });
    setMessage("");
  };

  return (
    <Fragment>
      <div className="event-page__center layout-w-sidebar__center">
        <Link className="event-page__center__back no-dec heading-2" to="/">
          <IoMdArrowRoundBack className="event-page__center__back--icon" />
          <span className="event-page__center__back--text">Back to Events</span>
        </Link>
        {!fetching && (
          <div className="event-page__center__content">
            <div className="event-page__center__content--title heading-3__bold">
              {state.data.name}
            </div>
            <div className="event-page__center__content--caption heading-4">
              {state.data.caption}
            </div>
            <img
              className="event-page__center__content--image"
              src={state.data.image}
            />
            <form
              onSubmit={handleComment}
              className="event-page__center__content__comment-form"
            >
              <input
                type="text"
                name="message"
                placeholder="Add a comment...."
                value={message}
                className="event-page__center__content__comment-form__input"
                onChange={(e) => setMessage(e.target.value)}
              />
              <input
                type="submit"
                value="comment"
                className="event-page__center__content__comment-form__button"
              />
            </form>
            <div className="event-page__center__content__comments">
              {state.data.comments.map((comment) => (
                <div className="event-page__center__content__comments__box">
                  <div>
                    <span className="heading-3__bold event-page__center__content__comments__box--name">
                      {comment.author.fullName}
                    </span>
                    <span className="heading-4">{comment.message}</span>
                  </div>

                  <div className="heading-5">
                    {moment(comment.date).fromNow()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div class="layout-w-sidebar__sidebar event-page__sidebar">
        {!fetching && (
          <AttendButton
            handleAttendeeUpdate={handleAttendeeUpdate}
            attended={
              !state.data.participantsList.find(
                (participant) => participant.fullName == currentUser.fullName
              )
            }
            eventpage={true}
          />
        )}

        {!fetching && (
          <div className="event-page__sidebar__body heading-3 ">
            <div>{state.data.location}</div>
            <div>{state.data.date}</div>
            <div>{state.data.time}</div>
            <div className="heading-5">
              <span>Organized by a </span>
              <span className="bold">{state.data.organizer.fullName}</span>
            </div>
            <div className="heading-2__bold event-page__sidebar__body__attendees">Attendees</div>
            {state.data.participantsList.map((participant) => (
              <div>{participant.fullName}</div>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(EventPage);
