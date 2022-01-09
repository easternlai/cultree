import axios from "axios";

const apiUrl = "http://localhost:5000";

export const getProducts = async (token) => {
  try {
    const response = await axios(apiUrl + `/api/store`, {
      method: "GET",
      headers: { token },
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const createProduct = async(token, formData) => {

  const config = {
    headers: {
        'content-type': 'multipart/form-data',
        token
    }
};
  try {

    const response = await axios.post(apiUrl+'/api/store', formData, config);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}