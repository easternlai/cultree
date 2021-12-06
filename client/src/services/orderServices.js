import axios from "axios";

const apiUrl = "http://localhost:8080";

export const placeOrderService = async (token, items) => {
  try {
    const response = await axios(apiUrl + "/api/order", {
      method: "POST",
      headers: { token },
      data: { items },
    });
    console.log(response.data);
    return response.data.orders;

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

        console.log(response.data);
        return response.data;

    } catch (err) {
        console.log(err);
    }
}