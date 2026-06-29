import axios from 'axios';
import React from 'react';


const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3001'
    baseURL: 'https://lifelog-server.vercel.app'
    
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;