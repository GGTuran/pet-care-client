/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { forgetUserPassword, loginUser, registerUser, resetPassword } from "../services/AuthService";

export const useUserRegistration = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_REGISTRATION"],
        mutationFn: async (userData) => await registerUser(userData),
        onSuccess: () => {
            toast.success("User registration successful.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useUserLogin = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_LOGIN"],
        mutationFn: async (userData) => await loginUser(userData),
        onSuccess: () => {
            toast.success("User login successful.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useForgotPassword = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_FORGOT_PASSWORD"],
        mutationFn: async (userData) => await forgetUserPassword(userData),
        onSuccess: (data) => {
            if (data) {
                toast.success(data.message);
            }
        },
        // onError: (error) => {
        //     console.log(error.message);
        // },
    });

};
export const useResetPassword = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_RESET_PASSWORD"],
        mutationFn: async (userData) => await resetPassword(userData),
        onSuccess: (data) => {
            if (data) {
                toast.success(data.message);
            }
        },
        onError: (error) => {
            console.log(error.message);
        },
    });

};