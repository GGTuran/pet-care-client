/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import axiosInstance from "@/lib/AxiosInstance";


export const userProfile = async () => {
    try {
        const { data } = await axiosInstance.get('/users/me',);
        // console.log(data, "data")
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

        const { data } = await axiosInstance.post(`/users/followUser`, { authorId });
        return data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const getFollowedUsers = async () => {
    try {
        const { data } = await axiosInstance.get("/users/getFollowedUsers");
        // console.log(data, 'from service')
        return data;
    } catch (error: any) {
        return error?.response?.data;
    }
};


export const getUserPosts = async (id: string) => {
    try {
        const { data } = await axiosInstance.get(`/post/${id}`, {


        });

        return data;


    } catch (error: any) {
        console.log(error?.response?.data, 'hi');
        return error?.response?.data;
    }

}


export const getAllUsers = async () => {
    try {
        const { data } = await axiosInstance.get("/users/");

        return data;

    } catch (error: any) {
        return error?.response?.data
    }
}


export const updateToAdmin = async (id: string) => {
    try {
        const { data } = await axiosInstance.patch(`/users/promote/${id}`)
        // console.log(data, 'from service')
        return data
    } catch (error: any) {
        return error?.response?.data;
    }
}


export const deleteUser = async (id: string) => {
    try {
        const { data } = await axiosInstance.delete(`/users/${id}`)
        // console.log(data, 'from service')
        return data
    } catch (error: any) {
        return error?.response?.data;
    }
}

