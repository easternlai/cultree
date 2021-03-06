import axios from "axios";

import {apiUrl} from './servicesTypes';

export const placeOrderService = async (token, items) => {
  try {
    const response = await axios(apiUrl + "/api/order", {
      method: "POST",
      headers: { token },
      data: { items },
    });

    return response.data;

  } catch (err) {
    return err;
  }
};

export const getUserOrdersService = async (token) => {
    try {
        const response = await axios(apiUrl + '/api/order/user', {
            method: 'GET',
            headers: {token},
        });

        return response.data;

    } catch (err) {
        console.log(err);
    }
}