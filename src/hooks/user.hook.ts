/* eslint-disable @typescript-eslint/no-explicit-any */

import { followUser, userProfile, userUpdate } from "@/services/UserService";
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
            console.log(authorId, 'mutate')
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
            console.log(error.message);
            toast.error("Error occurred while following user.");
        },
    });
};