import React from "react";

export const INITIAL_STATE = {
    id: null,
    fetching: true,
    error: false,
    data: {
        participantsList: [],
        caption: null,
        date: null,
        time: null,
        location: null,
        name: null,
        organizer: {
            email: null,
            fullName: null,
            username: null,
        },
        image: null,
    },
};

export const EventPageReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_EVENT_SUCCESS':{
            return {
                ...state,
                fetching: false,
                error: false,
                data:{
                    participantsList: [...action.payload.eventData.participantsList],
                    image: action.payload.eventData.image,
                    id: action.payload.eventData._id,
                    caption: action.payload.eventData.caption,
                    date: action.payload.eventData.date,
                    time: action.payload.eventData.time,
                    location: action.payload.eventData.location,
                    name: action.payload.eventData.name,
                    organizer: {
                        email: action.payload.eventData.organizer.email,
                        fullName: action.payload.eventData.organizer.fullName,
                        username: action.payload.eventData.organizer.username
                    },
                }

            }
        }
        case 'ADD_ATTENDEE':{
            console.log('test2')
            const attendeeId = action.payload.attendeeId;
            let participantsList = state.data.participantsList;
            const currentAttendee = !!participantsList.find((participant) => participant.attendee == attendeeId);
            if(!currentAttendee){
                participantsList.push({attendee: attendeeId});
            } else {
                participantsList = participantsList.filter((participant) => participant.attendee != attendeeId)
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    participantsList
                }
            }
        }
        default: {
            throw new Error(
                'Invalid action type passed to the eventDialog Reducer'
            )
        }
    }
}