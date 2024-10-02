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


export const userUpdate = async (userData: any) => {
    try {
        const { data } = await axiosInstance.patch('/users/me', userData);
        return data;
    } catch (error: any) {
        return error?.response?.data;
    }
}


export const followUser = async (authorId: string) => {
    try {
        console.log(authorId, 'service')
        const { data } = await axiosInstance.post(`/users/followUser`, { authorId });
        return data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const getFollowedUsers = async () => {
    try {
        const { data } = await axiosInstance.get("/users/getFollowedUsers");
        return data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
