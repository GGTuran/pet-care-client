/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import nexiosInstance from "@/config/nexios.config";
import axiosInstance from "@/lib/AxiosInstance";




export const createPost = async (formData: FormData): Promise<any> => {
    try {
        const { data } = await axiosInstance.post('/post', formData, {
            // headers: {
            //     "Content-Type": "multipart/form-data",
            // },
        });
        console.log(data, "data")
        return data;


    } catch (error: any) {
        console.error('Error:', error?.response?.data || error.message);
        return error?.response?.data || { success: false, message: 'Post creation failed' };
    }

}


export const getPosts = async () => {
    try {
        const { data } = await nexiosInstance.get('/post', {
            cache: "no-store"
        });
        console.log(data, "data")
        return data;


    } catch (error: any) {
        console.log(error?.response?.data, 'hi');
        return error?.response?.data;
    }

}