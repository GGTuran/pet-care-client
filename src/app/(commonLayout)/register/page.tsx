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
  //   const { setIsLoading: userLoading } = useUser();

  const redirect = searchParams.get("redirect");

  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      // profilePhoto:
      //   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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

  if (isPending) {
    //  handle loading state
  }

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <h3 className="my-2 text-xl font-bold">Register with Pet Care</h3>
      <p className="mb-4">Help pets Find Their Way Home</p>
      <div className="w-[35%]">
        <PCForm
          //! Only for development
          defaultValues={{
            name: "tayyab turan",
            email: "turan@gmail.com",
            mobileNumber: "123456789",
            password: "123456",
          }}
          resolver={zodResolver(registerValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <PCInput label="Name" name="name" size="sm" />
          </div>
          <div className="py-3">
            <PCInput label="Email" name="email" size="sm" />
          </div>
          <div className="py-3">
            <PCInput label="phone" name="phone" size="sm" />
          </div>
          <div className="py-3">
            <PCInput
              label="Password"
              name="password"
              size="sm"
              type="password"
            />
          </div>
          <div className="py-3">
            <PCInput label="role" name="role" size="sm" type="role" />
          </div>
          <div className="py-3">
            <PCInput label="address" name="address" size="sm" type="address" />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 text-default"
            size="lg"
            type="submit"
          >
            Registration
          </Button>
        </PCForm>
        <div className="text-center">
          Already have an account ? <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
