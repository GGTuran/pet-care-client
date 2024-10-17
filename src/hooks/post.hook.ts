/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPost, deletePost, downvotePost, getPosts, Payment, upvotePost, } from "@/services/PostService";
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import { toast } from "sonner";



export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, FormData>({
        mutationKey: ["CREATE_POST"],
        mutationFn: async (postData) => await createPost(postData),

        onSuccess: (data) => {

            if (data?.success) {
                queryClient.invalidateQueries({ queryKey: ["POST"] });
                toast.success('Post created successfully');
            }
            else {
                toast.error('Failed to create post');
            }
        },
        onError: (error) => {
            // console.log(error.message);
            toast.error(error.message);
        },
    });

};


export const useGetPost = (category: string, searchTerm: string) => {
    return useQuery({
        queryKey: ["POST", category, searchTerm],

        queryFn: async () => await getPosts(category, searchTerm),
        // refetchOnWindowFocus: true,
        // refetchOnMount: true,
        // refetchOnReconnect: true,
    });
}



export const useUpvotePost = () => {
    const queryClient = useQueryClient();
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
        // onError: (error) => {

        //     console.log(error.message);
        // },
    });
};



export const useDownVotePost = () => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, string>({
        mutationKey: ["downvotePost"],
        mutationFn: async (id) => {
            // console.log(id, 'from hook')
            return await downvotePost(id)
        },

        onSuccess: (data) => {
            // console.log(data, 'data from console log')

            if (data?.success) {
                queryClient.invalidateQueries({ queryKey: ["POST"] });
                // console.log(data);
                toast.success("Down voted post")
            }

            else {
                toast.error('Post downvote failed');
            }
        },
        onError: (error) => {

            toast.error(error.message);
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


            if (data?.success) {
                queryClient.invalidateQueries({ queryKey: ["POST"] });
                toast.success("Post deleted successfully!");
            } else {
                toast.error(data?.message || "Failed to delete post.");
            }
        },
        onError: (error) => {
            // console.log(error.message);
            toast.error("Error occurred while deleting post.");
        },
    });
}


export const usePayment = () => {


    return useMutation<any, Error, string>({
        mutationKey: ["PAYMENT"],
        mutationFn: async (id) => {

            return await Payment(id);
        },
        onSuccess: (data) => {



            if (data?.success) {
                toast.success("Redirecting to payment page");
            } else {
                toast.error(data?.message || "Failed to proceed payment");
            }
        },
        onError: (error) => {
            // console.log(error.message);
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