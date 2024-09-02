import axios from "axios";

export const sendPhoneNumber = async (chatt_id) => {
    return axios.post("https://stage-constructorbot.chatapp.team/api/request/?token=b5ecf48f-a532-458e-bd5d-c00788e09f23&chatt_id=&template_id=296", { chatt_id });
};

export const verifyOTP = async (chatt_id, password) => {
    return axios.post("https://stage-constructorbot.chatapp.team/api/request/?token=b5ecf48f-a532-458e-bd5d-c00788e09f23&chatt_id=&password=&template_id=299", { chatt_id, password });
};
