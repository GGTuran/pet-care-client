import { USER_ROLE } from "@/constants/user.constant";
import { z } from "zod";

const registerValidationSchema = z.object({
    name: z.string().min(1, "Please enter your name!"),
    email: z.string().email("Please enter a valid email address!"),
    phone: z
        .string()
        .regex(/^\d{11}$/, "Please enter a valid mobile number!"),
    password: z.string(),
    address: z.string({ required_error: 'Address is required' }),
    role: z.nativeEnum(USER_ROLE),
});

export default registerValidationSchema;


