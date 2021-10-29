import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import NavBar from '../../components/NavBar/NavBar';
import { getEvent } from '../../services/eventServices';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { EventPageReducer } from './eventPageReducer';

const EventPage = ({ token }) => {
    const { eventId } = useParams();

    const [state, dispatch] = useReducer(EventPageReducer);

    let eventData=undefined;

    let fetching = state ? state.fetching: true;

    useEffect(()=> {
        (async function () {
            if (!state) {
                eventData = await getEvent(eventId, token);
                    dispatch({ type: 'FETCH_EVENT_SUCCESS', payload: { eventData } })
            }
        })();
    });

    return (
        <div className="body-container eventpage">
            <NavBar />
            <div className="eventpage-center">
                <Link className="eventpage-center-back" to="/">
                    <IoMdArrowRoundBack className="eventpage-center-back__icon" />
                    <span className="eventpage-center-back__text">Back to Events</span>
                </Link>
                {!fetching && <img className="eventpage-center__image" src={state.image}/>}
            </div>
            <div class="eventpage-sidebar">

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.token
});

export default connect(mapStateToProps)(EventPage);