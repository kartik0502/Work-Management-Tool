import axios from "axios";

export const apiRequest = async (url, method, data) => {
    try {
        console.log(url);
        const response = await axios({
            url: url,
            method: method,
            data: data,
            headers : {
                authorization : `Bearer ${localStorage.getItem('token')}`
            },
        });
        return response.data;
    } catch (err) {
        return err;
    }
};