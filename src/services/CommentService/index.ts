/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import nexiosInstance from "@/config/nexios.config";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";


export const createComment = async (commentData: any): Promise<any> => {
    try {
        const { data } = await axiosInstance.post('/comment', commentData);
        revalidateTag("Post");
        return data;
    } catch (error: any) {
        console.error('Error creating comment:', error?.response?.data || error.message);
        return error?.response?.data || { success: false, message: 'Comment creation failed' };
    }
};


export const getComments = async (postId: any) => {
    try {
        const { data } = await axiosInstance.get(`/comment/${postId}`);
        // console.log(postId, 'from service')
        // console.log(data, 'from service')
        revalidateTag("Post");
        return data;
    } catch (error: any) {
        console.error('Error creating comment:', error?.response?.data || error.message);
        return error?.response?.data || { success: false, message: 'Comment creation failed' };
    }
};


export const updateComment = async (id: string, commentData: any): Promise<any> => {
    try {
        await axiosInstance.patch(`/comment/${id}`, commentData);
        revalidateTag("Post");

    } catch (error: any) {
        return error?.response?.data || { success: false, message: 'Comment editing failed' };
    }
}

export const getCommentById = async (id: string) => {
    try {
        axiosInstance.get(`/comment/${id}`);

    } catch (error: any) {
        return error?.response?.data;
    }
}


export const deleteCommentFromDB = async (id: any) => {

    try {
        await axiosInstance.delete(`/comment/${id}`, {});
        revalidateTag("comments");
    } catch (error) {
        console.error("Error deleting comment:", error);
    }
}




