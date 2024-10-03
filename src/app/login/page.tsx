"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/UI/Loading";
import PCForm from "@/components/form/PCForm";
import PCInput from "@/components/form/PCInput";
import loginValidationSchema from "@/schemas/login.schema";
import { useUserLogin } from "@/hooks/auth.hook";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
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
    <>
      {isPending && <Loading />}
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 sm:px-8 lg:px-0">
        <h3 className="my-2 text-lg sm:text-xl md:text-2xl font-bold text-center">
          Login with Pet Care
        </h3>
        <p className="mb-4 text-center text-xs sm:text-sm md:text-base">
          Welcome Back! Let&lsquo;s Get Started
        </p>

        {/* Form container adjustments for small screens */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <PCForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-2 sm:py-3">
              <PCInput label="Email" name="email" type="email" />
            </div>
            <div className="py-2 sm:py-3">
              <PCInput label="Password" name="password" type="password" />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href={"/forget-password"}
                className="text-blue-500 text-xs sm:text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </PCForm>

          {/* Responsive link to Register */}
          <div className="text-center mt-4 text-xs sm:text-sm md:text-base">
            Don&lsquo;t have an account?{" "}
            <Link href={"/register"} className="text-blue-500">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
