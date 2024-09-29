/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";


export const userProfile = async () => {
    try {
        const { data } = await axiosInstance.get('/users/me',);
        console.log(data, "data")
        return data;


    } catch (error: any) {
        console.log(error?.response?.data, 'hi');
        return error?.response?.data;
    }

}


export const userUpdate = async (userdata: any) => {
    try {
        const { data } = await axiosInstance.put('/users/me', userdata);
        return data;
    } catch (error: any) {
        return error?.response?.data;
    }
}