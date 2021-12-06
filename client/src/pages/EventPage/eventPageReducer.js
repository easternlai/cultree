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
    comments: [],
    organizer: {
      email: null,
      fullName: null,
      _id: null,
    },
    image: null,
  },
};

export const EventPageReducer = (state, action) => {
  const { eventData } = action.payload;

  switch (action.type) {
    case "FETCH_EVENT_SUCCESS": {
      console.log(eventData);
      return {
        ...state,
        fetching: false,
        error: false,
        data: {
          participantsList: [...eventData.participantsList],
          image: eventData.image,
          id: eventData._id,
          caption: eventData.caption,
          date: eventData.date,
          time: eventData.time,
          location: eventData.location,
          name: eventData.name,
          organizer: {
            email: eventData.organizer.email,
            fullName: eventData.organizer.fullName,
            _id: eventData.organizer._id,
          },
          comments: [...eventData.comments],
        },
      };
    }
    case "ADD_ATTENDEE": {
      const fullName = action.payload.fullName;
      let participantsList = state.data.participantsList;
      const currentAttendee = !!participantsList.find(
        (participant) => participant.fullName == fullName
      );
      if (!currentAttendee) {
        participantsList.push({ fullName: fullName });
      } else {
        participantsList = participantsList.filter(
          (participant) => participant.fullName != fullName
        );
      }
      return {
        ...state,
        data: {
          ...state.data,
          participantsList,
        },
      };
    }

    case "CREATE_COMMENT": {
      return {
        ...state,
        data: {
          ...state.data,
          comments: [...state.data.comments, action.payload.comment],
        },
      };
    }

    case "DELETE_COMMENT": {
  
      const comments = state.data.comments;
      const findIndex = comments.findIndex(
        (comment) => comment._id == action.payload.commentId
      );
      if (findIndex !== -1) {
        comments.splice(findIndex, 1);
      }
      return {
        ...state,
        data: { ...state.data, comments: [...comments] },
      };
    }

    default: {
      throw new Error("Invalid action type passed to the eventDialog Reducer");
    }
  }
};
