import axios from "axios";
import {apiUrl} from './servicesTypes';
const yelpApiKey =
  "U-8w66jBxV3tGqzpsZB78XWWSAOO77l2kQQMQhPwmtROCyYONtLYVozDupjOSXlyzPzRpL5SN-n20pjpmWHvq5LGq_Fc6spSeXZND9gf7FMLXY1pWL_9J3EZ1H5mYXYx";



export const createEvent = async(token, type, name, location, address, date, time, caption, imageLink) => {
  try {

    const response = await axios(apiUrl + `/api/event`, {
      method: "POST", 
      headers: {token},
      data: {token, type, name, location, address, date, time, caption, imageLink}
    });

    console.log({message:'event created'});

  } catch (err) {
    console.log(err);
  }
}

export const deleteEvent = async ( eventId, token) => {
  try {
    const response = await axios(apiUrl+`/api/event/${eventId}`, {
      method: 'DELETE',
      headers: {token}
    });
  } catch (err) {
    throw new Error({err: err.response.data});
  }
}

export const attendEvent = async (eventId, token) => {
  try {
    const response = await axios(apiUrl + `/api/event/${eventId}/attend`, {
      method: "POST",
      headers: { token },
    });
    return response;
  } catch (err) {
    console.log({err})
  }
};

export const getEvent = async (eventId, token) => {
  try {
    const response = await axios(apiUrl + `/api/event/${eventId}`, {
      method: "GET",
      headers: { token },
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
  
};

export const createComment = async (eventId, token, message) => {
  try {
    const response = await axios(apiUrl + `/api/comment/${eventId}`, {
      method: "POST",
      headers: { token },
      data: { message },
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const deleteComment = async (commentId, token) => {

  try {
    const response = await axios(apiUrl + `/api/comment/${commentId}`, {
      method: 'DELETE',
      headers: {token}
    });
  } catch (err) {
    console.log(err.response);
  }
}


export const yelpSearch = async (search) => {
  console.log(search);

    try {
        const response = await axios(`https://peaceful-ocean-40125.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${search}&location=94111`, {
            method: 'GET',
            headers: {
                "accept": "application/json",
                "x-requested-with": "xmlhttprequest",
                "Access-Control-Allow-Origin":"*",
                Authorization: `Bearer ${yelpApiKey}`
            },
        });
        console.log(response);
        return (response.data.businesses);
    } catch (err) {
        console.log(err.response);
    }
};
