/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PCForm from "@/components/form/PCForm";
import PCInput from "@/components/form/PCInput";
import { useResetPassword } from "@/hooks/auth.hook";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";

const ResetPassword = ({ searchParams }: { searchParams: any }) => {
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  // console.log(params, "url search");
  const token = params.get("token");
  const userId = params.get("id");

  const { mutate: resetPassword } = useResetPassword();

  // console.log(token, userId, "token");

  const onSubmit = async (data: FieldValues) => {
    const userData = {
      password: data.password,
      userId,
      token,
    };
    resetPassword(userData);
    // console.log(data.password);
    // console.log(userData);
    router.push("/login");
  };

  return (
    <div className="w-[50%] mx-auto mt-[10%]">
      <h1>Reset Password</h1>
      <PCForm onSubmit={onSubmit}>
        <PCInput name="password" label="password" type="password" required />
        <Button
          type="submit"
          className="mt-5 w-full bg-black text-white dark:bg-gray-500"
        >
          Reset Password
        </Button>
      </PCForm>
    </div>
  );
};

export default ResetPassword;
