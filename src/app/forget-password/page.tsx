"use client";

import PCForm from "@/components/form/PCForm";
import PCInput from "@/components/form/PCInput";
import { useForgotPassword } from "@/hooks/auth.hook";
import { Button } from "@nextui-org/react";
import { FieldValues } from "react-hook-form";

const ForgetPassword = () => {
  const { mutate: forgetPassword } = useForgotPassword();

  const onSubmit = async (data: FieldValues) => {
    forgetPassword(data);
  };

  return (
    <div className="w-[50%] mx-auto mt-[10%]">
      <h1>Forget Password</h1>
      <PCForm onSubmit={onSubmit}>
        <PCInput name="email" label="Email" type="email" required />
        <Button
          type="submit"
          className="mt-5 w-full bg-black text-white dark:bg-gray-500"
        >
          Send Email
        </Button>
      </PCForm>
    </div>
  );
};

export default ForgetPassword;
