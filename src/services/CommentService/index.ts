/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

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