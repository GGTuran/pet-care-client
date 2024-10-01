/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import nexiosInstance from "@/config/nexios.config";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";




export const createPost = async (formData: FormData): Promise<any> => {
    try {
        const { data } = await axiosInstance.post('/post', formData, {
            // headers: {
            //     "Content-Type": "multipart/form-data",
            // },
        });

        revalidateTag("Post");
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
            cache: "no-store",
            next: {
                tags: ["post",]
            }
        });
        console.log(data, "data")
        return data;


    } catch (error: any) {
        console.log(error?.response?.data, 'hi');
        return error?.response?.data;
    }

}


export const upvotePost = async (id: string) => {
    console.log(id, 'postId');
    try {
        const { data } = await axiosInstance.patch(`/post/${id}/upvote`,);
        // console.log(data, 'data');
        // console.log(id, 'from service')
        revalidateTag("Post");
        return data;
    } catch (error: any) {
        console.log(error, 'error');
        return error?.response?.data;
    }
}

export const downvotePost = async (postId: string) => {
    try {
        const { data } = await axiosInstance.patch(`/post/${postId}/downVote`,);
        console.log(data, 'from service')
        revalidateTag("Post");
        return data;
    } catch (error: any) {
        return error?.response?.data;
    }
};




// export const getSinglePost = async (id: string) => {
//     try {
//         const { data } = await nexiosInstance.get(`/post/${id}`, {
//             cache: "no-store"
//         });
//         console.log(data, "data")
//         return data;


//     } catch (error: any) {
//         console.log(error?.response?.data, 'hi');
//         return error?.response?.data;
//     }

// }