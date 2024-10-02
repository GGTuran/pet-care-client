/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/lib/AxiosInstance";




export const registerUser = async (userData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/signup", userData);

        if (data.success) {
            cookies().set("accessToken", data?.data?.accessToken);
            cookies().set("refreshToken", data?.data?.refreshToken);
        }

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const loginUser = async (userData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/login", userData);

        if (data.success) {
            cookies().set("accessToken", data?.data?.accessToken);
            cookies().set("refreshToken", data?.data?.refreshToken);
        }

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const logout = () => {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
};




export const getCurrentUser = async () => {
    const accessToken = cookies().get("accessToken")?.value;

    let decodedToken = null;

    if (accessToken) {
        decodedToken = await jwtDecode(accessToken);

        // console.log(decodedToken, 'see who')

        return {
            userId: decodedToken.userId,
            name: decodedToken.name,
            email: decodedToken.email,
            phone: decodedToken.phone,
            role: decodedToken.role,
            address: decodedToken.address,
            isPaid: decodedToken?.isPaid,
            // profilePhoto: decodedToken.profilePhoto,
        };
    }

    return decodedToken;
};

export const getNewAccessToken = async () => {
    try {
        const refreshToken = cookies().get("refreshToken")?.value;

        const res = await axiosInstance({
            url: "/auth/refresh-token",
            method: "POST",
            withCredentials: true,
            headers: {
                cookie: `refreshToken=${refreshToken}`,
            },
        });

        return res.data;
    } catch (error) {
        throw new Error("Failed to get new access token");
    }
};



export const forgetUserPassword = async (email: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/forget-password", email);
        console.log(data);
        return data;
    } catch (error: any) {
        console.log(error);
        return error?.response?.data;

    }
};

export const resetPassword = async (userData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/reset-password", userData, {
            headers: {
                'Authorization': userData?.token
            }
        });
        console.log(data, 'service')
        return data;
    } catch (error: any) {
        return error?.response?.data;
    }
}  