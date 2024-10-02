import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};


export interface IInput {
    variant?: "flat" | "bordered" | "faded" | "underlined";
    size?: "sm" | "md" | "lg";
    required?: boolean;
    type?: string;
    label: string;
    name: string;
    disabled?: boolean;
}


export interface IUser {
    userId: string
    email: string
    role: string
    name: string
    phone: string
    address: string
    isPaid?: boolean
    iat?: number
    exp?: number
}

export type TPost = {
    _id?: string;
    title: string;
    content: string;
    category: string;
    author: string;
    image: string;
    premium: boolean;
    upVotes: number;
    downVotes: number;
    comments?: string[];
};