"use client";

import PCForm from "@/components/form/PCForm";
import PCInput from "@/components/form/PCInput";
import { useUserRegistration } from "@/hooks/auth.hook";
import registerValidationSchema from "@/schemas/registration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");

  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    handleUserRegistration(userData);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 sm:px-8 lg:px-0">
      <h3 className="my-2 text-lg sm:text-xl md:text-2xl font-bold text-center">
        Register with Pet Care
      </h3>
      <p className="mb-4 text-center text-xs sm:text-sm md:text-base">
        Help pets Find Their Way Home
      </p>

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <PCForm
          // //! Only for development
          // defaultValues={{
          //   name: "tayyab turan",
          //   email: "turan@gmail.com",
          //   mobileNumber: "123456789",
          //   password: "123456",
          // }}
          resolver={zodResolver(registerValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-2 sm:py-3">
            <PCInput label="Name" name="name" size="sm" />
          </div>
          <div className="py-2 sm:py-3">
            <PCInput label="Email" name="email" size="sm" />
          </div>
          <div className="py-2 sm:py-3">
            <PCInput label="Phone" name="phone" size="sm" />
          </div>
          <div className="py-2 sm:py-3">
            <PCInput
              label="Password"
              name="password"
              size="sm"
              type="password"
            />
          </div>
          <div className="py-2 sm:py-3">
            <PCInput label="Role" name="role" size="sm" value="user" />
          </div>
          <div className="py-2 sm:py-3">
            <PCInput label="Address" name="address" size="sm" />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 text-default"
            size="lg"
            type="submit"
          >
            Registration
          </Button>
        </PCForm>

        <div className="text-center mt-4 text-xs sm:text-sm md:text-base">
          Already have an account?{" "}
          <Link href={"/login"} className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
