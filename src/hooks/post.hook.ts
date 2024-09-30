/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPost } from "@/services/PostService";
import { useMutation } from "@tanstack/react-query";
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
        },
    });

};