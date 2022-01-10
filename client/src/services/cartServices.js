import axios from "axios";

import {apiUrl} from './servicesTypes';

export const ModifyCart = async (token, productId, orderPrice, quantity) => {
  try {
    const response = await axios(apiUrl + `/api/cart/${productId}`, {
      method: "PUT",
      headers: {token},
      data: {
        orderPrice,
        quantity,
      },
    });
    
    return response.data;

  } catch (err) {
    console.log(err);
  }
};

export const getCart = async (token) => {
    try {
        const response = await axios(apiUrl + '/api/cart', {
            method: 'GET',
            headers: {token}
        });

        return response.data;
        
    } catch (err) {
        console.log(err);
    }
}