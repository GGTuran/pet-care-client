/* eslint-disable @typescript-eslint/no-explicit-any */
import { createComment, getCommentById, getComments, updateComment } from "@/services/CommentService";
import { useMutation, QueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const queryClient = new QueryClient();

export const useCreateComment = () => {
    return useMutation<any, Error, any>({
        mutationKey: ["CREATE_COMMENT"],
        mutationFn: async (commentData) => await createComment(commentData),
        onSuccess: (data) => {
            if (data?.success) {
                queryClient.invalidateQueries({ queryKey: ["POST"] }); // Re-fetch post data
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

    return useQuery({
        queryKey: ["GET_COMMENT", postId],
        queryFn: async (postId) => {
            console.log(postId, 'hooking')
            await getComments(postId)
        },

    });
};

// export const useGetCommentById = (id: string) => {
//     return useQuery({
//         queryKey: ["GET_COMMENT_BY_ID", id],
//         queryFn: async (id) => {
//             console.log(id, 'hooking')
//             await getCommentById(id)
//         },

//     });
// }


export const useEditComment = () => {
    return useMutation<any, Error, { id: string; commentData: any }>({
        mutationKey: ["EDIT_COMMENT"],
        mutationFn: async ({ id, commentData }) => await updateComment(id, commentData),
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["comments"] }); // Re-fetch post data
            toast.success("Comment edited successfully");

        },
        onError: (error) => {
            console.error("Error creating comment:", error.message);
            toast.error("Failed to create comment");
        },
    });
};


