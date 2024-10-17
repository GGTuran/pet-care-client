/* eslint-disable @typescript-eslint/no-explicit-any */
import { createComment, deleteCommentFromDB, getCommentsByPostId, updateComment } from "@/services/CommentService";
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import { toast } from "sonner";




export const useCreateComment = () => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, any>({
        mutationKey: ["CREATE_COMMENT"],
        mutationFn: async (commentData) => await createComment(commentData),

        onSuccess: (data) => {
            if (data?.success) {
                queryClient.invalidateQueries({ queryKey: ["GET_COMMENT"] });
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


export const useGetCommentByPost = (postId: any) => {

    return useQuery({
        queryKey: ["GET_COMMENT", postId],
        queryFn: async () => {

            return await getCommentsByPostId(postId)
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
    const queryClient = useQueryClient();
    return useMutation<any, Error, { id: string; commentData: any }>({
        mutationKey: ["EDIT_COMMENT"],
        mutationFn: async ({ id, commentData }) => await updateComment(id, commentData),
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["GET_COMMENT"] });
            toast.success("Comment edited successfully");

        },
        onError: (error) => {
            console.error("Error creating comment:", error.message);
            toast.error("Failed to create comment");
        },
    });
};


export const UseDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, any>({
        mutationKey: ["DELETE_COMMENT"],
        mutationFn: async (id) => await deleteCommentFromDB(id,),
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["GET_COMMENT"] });
            toast.success("Comment deleted successfully");

        },
        onError: (error) => {
            console.error("Error creating comment:", error.message);
            toast.error("Failed to create comment");
        },
    });
}

