import axios from "axios";
import { ADD_ITEM_ERR, ADD_ITEM_SUCCESS } from "./actionTypes";

export const addItem = (name, quantity, location, is_donation, expiry) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': token
        }
    };

    const body = JSON.stringify({ name, quantity, location, is_donation, expiry });

    try {
        const res = await axios.post("http://127.0.0.1:8000/api/v1/items/create", body, config);

        if (res.data.error) {
            dispatch({
                type: ADD_ITEM_ERR
            });
        } else {
            dispatch({
                type: ADD_ITEM_SUCCESS
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_ITEM_ERR
        });
    }
}
