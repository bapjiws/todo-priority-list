import axios from 'axios';

export const getAxiosInstance = () => {
    return axios.create({
        baseURL: process.env.API_URL,
        headers: {'Content-Type': 'application/json'}
    });
};