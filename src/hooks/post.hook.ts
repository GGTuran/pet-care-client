/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPost, getPosts, } from "@/services/PostService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePost = () => {
    return useMutation<any, Error, FormData>({
        mutationKey: ["CREATE_POST"],
        mutationFn: async (postData) => await createPost(postData),
        onSuccess: (data) => {
            if (data?.success) {
                toast.success('Post created successfully');
            }
            else {
                toast.error('Post creation failed');
            }
        },
        onError: (error) => {
            console.log(error.message);
            toast.error(error.message);
        },
    });

};


export const useGetPost = () => {
    return useQuery({
        queryKey: ["POST"],
        queryFn: async () => await getPosts(),
    });
}
// export const useGetSinglePost = (id: string) => {
//     return useQuery({
//         queryKey: ["SINGLE_POST"],
//         queryFn: async () => await getSinglePost(id),
//     });
// }