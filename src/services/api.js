import axios from "axios";

export const sendPhoneNumber = async (chatt_id) => {
    return axios.post("https://stage-constructorbot.chatapp.team/api/request/?token=b5ecf48f-a532-458e-bd5d-c00788e09f23&chatt_id=&template_id=296", { chatt_id });
};
export const fetchResultData = async (chatt_id, password) => {
    try {
        const response = await axios.get(`https://stage-constructorbot.chatapp.team/api/request/get_result/?token=b5ecf48f-a532-458e-bd5d-c00788e09f23&password2=${password}&chatt_id=${chatt_id}&template_id=299`, {chatt_id, password});

        const data = response.data;

        return data.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
