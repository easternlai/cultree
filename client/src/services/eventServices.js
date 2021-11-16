import axios from "axios";
const yelpApiKey =
  "U-8w66jBxV3tGqzpsZB78XWWSAOO77l2kQQMQhPwmtROCyYONtLYVozDupjOSXlyzPzRpL5SN-n20pjpmWHvq5LGq_Fc6spSeXZND9gf7FMLXY1pWL_9J3EZ1H5mYXYx";

const apiUrl = "http://localhost:8080";

export const createEvent = async(token, type, name, location, date, time, caption, imageLink) => {
  try {

    const response = await axios(apiUrl + `/api/event`, {
      method: "POST", 
      headers: {token},
      data: {token, type, name, location, date, time, caption, imageLink}
    });

    console.log(response.data);

  } catch (err) {
    
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
    throw new Error({ err: err.response.data });
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
    console.log(err.response.data);
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

export const yelpSearch = async (search) => {

    try {
        const response = await axios(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${search}&location=94111`, {
            method: 'GET',
            headers: {
                "accept": "application/json",
                "x-requested-with": "xmlhttprequest",
                "Access-Control-Allow-Origin":"*",
                Authorization: `Bearer ${yelpApiKey}`
            },
        });
        return (response.data.businesses);
    } catch (err) {
        console.log(err.response);
    }
};
