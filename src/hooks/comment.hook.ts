/* eslint-disable @typescript-eslint/no-explicit-any */
import { createComment, getComments } from "@/services/CommentService";
import { useMutation, QueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const queryClient = new QueryClient();

export const useCreateComment = () => {
    return useMutation<any, Error, any>({
        mutationKey: ["CREATE_COMMENT"],
        mutationFn: async (commentData) => await createComment(commentData),
        onSuccess: (data) => {
            if (data?.success) {
                queryClient.invalidateQueries({ queryKey: ["Post"] }); // Re-fetch post data
                toast.success("Comment added successfully");
            } else {
                toast.error("Comment creation failed");
            }
        },
        onError: (error) => {
            console.error("Error creating comment:", error.message);
            toast.error("Failed to create comment");
        },
    });
};


export const useGetComment = (postId: any) => {
    console.log(postId, 'from hok')
    return useQuery({
        queryKey: ["GET_COMMENT", 'postId'],
        queryFn: async (postId) => {
            console.log(postId, 'hooking')
            await getComments(postId)
        },

    });
};

