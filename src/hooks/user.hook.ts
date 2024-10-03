/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { deleteUser, followUser, getAllUsers, getFollowedUsers, getPaidUsers, updateToAdmin, userProfile, userUpdate } from "@/services/UserService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useGetProfile = () => {
    return useQuery({
        queryKey: ["USER_PROFILE"],
        queryFn: async () => await userProfile(),
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_UPDATE"],
        mutationFn: async (userData) => await userUpdate(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["USER_PROFILE"] });
        },
        onError: (error) => {
            // Optionally handle errors here
            console.error("Error updating profile:", error);
        },
    });
};

export const useFollowUser = () => {
    return useMutation<any, Error, string>({
        mutationKey: ["followUser"],
        mutationFn: async (authorId) => {

            return await followUser(authorId);
        },
        onSuccess: (data) => {
            if (data?.success) {

                toast.success("Followed user successfully!");
            } else {
                toast.error("Failed to follow user.");
            }
        },
        onError: (error) => {
            // console.log(error.message);
            toast.error("Error occurred while following user.");
        },
    });
};

export const useGetFollowers = () => {
    return useQuery({
        queryKey: ["USER_FOLLOWER"],
        queryFn: async () => await getFollowedUsers(),
    })
}

export const useGetAllUsers = () => {
    return useQuery({
        queryKey: ["GET_ALL_USERS"],
        queryFn: async () => await getAllUsers(),
    })
}


export const useUpdateToAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, string>({
        mutationKey: ["UPDATE_TO_ADMIN"],
        mutationFn: async (id) => {

            return await updateToAdmin(id);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["GET_ALL_USERS"] });

            if (data?.success) {
                toast.success("Updated to Admin successfully!");
            } else {
                toast.error(data?.message || "Failed to update user.");
            }
        },
        onError: (error) => {
            // console.log(error.message);
            toast.error("Error occurred while updating user.");
        },
    });
};


export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, string>({
        mutationKey: ["DELETE_USER"],
        mutationFn: async (id) => {

            return await deleteUser(id);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["GET_ALL_USERS"] });

            if (data?.success) {
                toast.success("Deleted user successfully!");
            } else {
                toast.error(data?.message || "Failed to delete user.");
            }
        },
        onError: (error) => {
            // console.log(error.message);
            toast.error("Error occurred while delete user.");
        },
    });
}


export const useGetPaidUsers = () => {
    return useQuery({
        queryKey: ["GET_PAID_USERS"],
        queryFn: async () => await getPaidUsers(),
    })
}



// export const useGetUserPost = () =>{
//     const queryClient = useQueryClient();
//     return useQuery<any,Error,string>({
//         queryKey:["USE_GET_USER_POST"],
//         queryFn: async(id) => {return await getUserPosts(id)}
//     })
// }