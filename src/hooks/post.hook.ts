/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPost, deletePost, downvotePost, getPosts, Payment, upvotePost, } from "@/services/PostService";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const queryClient = new QueryClient();

export const useCreatePost = () => {
    return useMutation<any, Error, FormData>({
        mutationKey: ["CREATE_POST"],
        mutationFn: async (postData) => await createPost(postData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["POST"] });
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
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
}


export const useUpvotePost = () => {
    return useMutation<any, Error, string>({
        mutationKey: ["upvotePost"],
        mutationFn: async (id) => {
            // console.log(id, 'from hook')
            return await upvotePost(id)
        },

        onSuccess: (data) => {
            // console.log(data, 'data from console log')
            queryClient.invalidateQueries({ queryKey: ["POST"] });
            if (data?.success) {
                // queryClient.invalidateQueries({ queryKey: ["Post"] });
                // console.log(data);
                toast.success("Up voted post")
            }

            else {
                toast.error('Post upvote failed');
            }
        },
        onError: (error) => {

            console.log(error.message);
        },
    });
};



export const useDownVotePost = () => {
    return useMutation<any, Error, string>({
        mutationKey: ["downvotePost"],
        mutationFn: async (id) => {
            // console.log(id, 'from hook')
            return await downvotePost(id)
        },

        onSuccess: (data) => {
            // console.log(data, 'data from console log')
            queryClient.invalidateQueries({ queryKey: ["Post"] });
            if (data?.success) {

                // console.log(data);
                toast.success("Down voted post")
            }

            else {
                toast.error('Post downvote failed');
            }
        },
        onError: (error) => {

            console.log(error.message);
        },
    });
}



export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, string>({
        mutationKey: ["DELETE_POST"],
        mutationFn: async (id) => {

            return await deletePost(id);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["POST"] });

            if (data?.success) {
                toast.success("Post deleted successfully!");
            } else {
                toast.error(data?.message || "Failed to delete post.");
            }
        },
        onError: (error) => {
            console.log(error.message);
            toast.error("Error occurred while deleting post.");
        },
    });
}


export const usePayment = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, string>({
        mutationKey: ["PAYMENT"],
        mutationFn: async (id) => {

            return await Payment(id);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["POST"] });


            if (data?.success) {
                toast.success("Redirecting to payment page");
            } else {
                toast.error(data?.message || "Failed to proceed payment");
            }
        },
        onError: (error) => {
            console.log(error.message);
            toast.error("Error occurred while paying");
        },
    });
}

// export const useGetSinglePost = () => {
//     return useQuery({
//         queryKey: ["SINGLE_POST"],
//         queryFn: async () => await getSinglePost(id),
//     });
// }