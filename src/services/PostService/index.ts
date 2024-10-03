/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import axiosInstance from "@/lib/AxiosInstance";





export const createPost = async (formData: FormData): Promise<any> => {
    try {
        const { data } = await axiosInstance.post('/post', formData, {
            // headers: {
            //     "Content-Type": "multipart/form-data",
            // },
        });



        return data;


    } catch (error: any) {
        console.error('Error:', error?.response?.data || error.message);
        return error?.response?.data || { success: false, message: 'Post creation failed' };
    }

}


export const getPosts = async (category: string, searchTerm: string) => {
    try {
        const { data } = await axiosInstance.get(`/post?category=${category}&searchTerm=${searchTerm}`);

        return data;


    } catch (error: any) {

        return error?.response?.data;
    }

}


export const upvotePost = async (id: string) => {
    console.log(id, 'postId');
    try {
        const { data } = await axiosInstance.patch(`/post/${id}/upvote`,);
        // console.log(data, 'data');
        // console.log(id, 'from service')

        return data;
    } catch (error: any) {

        return error?.response?.data;
    }
}

export const downvotePost = async (postId: string) => {
    try {
        const { data } = await axiosInstance.patch(`/post/${postId}/downVote`,);


        return data;
    } catch (error: any) {
        return error?.response?.data;
    }
};


export const deletePost = async (id: string) => {
    try {
        const { data } = await axiosInstance.delete(`/post/${id}`)


        return data
    } catch (error: any) {
        return error?.response?.data;
    }
}


export const Payment = async (id: string) => {
    try {
        const { data } = await axiosInstance.post(`/post/payment/${id}`)


        return data;
    } catch (error: any) {
        return error?.response?.data;
    }
}



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