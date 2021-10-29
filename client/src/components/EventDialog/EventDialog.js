import React, { useEffect, useReducer, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { attendEvent } from '../../services/eventServices';
import { EventDialogReducer, INITIAL_STATE } from './eventDialogReducer';
import { attendeeUpdate } from './EventDialogAction';

const EventDialog = ({ eventData, eventId, key, token, currentUser, socket }) => {

    const [state, dispatch] = useReducer(EventDialogReducer, INITIAL_STATE);

    useEffect(()=> {
        if(eventData){
            dispatch({type: 'FETCH_EVENT_SUCCESS', payload: {eventData}});
        }

    },[eventId, eventData]);

    const handleAttendeeUpdate = async () => {
        dispatch({type: 'ADD_ATTENDEE', payload: {attendeeId:currentUser._id}});
        attendEvent(eventId, token);
    }

    return (
        <div  className="event-wrapper">
            <div className="event-left-icon">
                <span className="event-left-icon__initials">{eventData.organizer.fullName[0]}</span>
            </div>
            <div className="event-dialog">
                <div className="event-dialog-date heading-5">{eventData.date}{eventData.time&&<span> @{eventData.time && eventData.time}</span>}</div>
                <div className="event-dialog-heading">
                    <div className="event-dialog-heading__name heading-4__bold">{eventData.name}</div>
                    <div className="event-dialog-heading__type heading-4__bold">Lunch</div>
                </div>
                <Link to={`/event/${eventId}`} className="event-dialog-info">
                    <div  className="heading-4">{eventData.caption}</div>
                    <div className="heading-5"><span>created by </span><span className="heading-5__bold">{eventData.organizer.fullName}</span></div>
                </Link>
                <img src={eventData.image} className="event-dialog-image"/>
                <div className="event-dialog-attendees heading-4">
                    <div className="event-dialog-attendees__count">{state.data.participantsList.length} {state.data.participantsList.length==1?<span>attendee</span>:<span>attendees</span>}</div>
                    <div className="event-dialog-attendees__addbutton" onClick={handleAttendeeUpdate}>Attend</div>
                </div>
            </div>

        </div>
    )
};

const mapStateToProps = (state) => ({
    token: state.user.token,
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(EventDialog);