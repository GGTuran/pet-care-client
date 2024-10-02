/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import UpdateProfile from "@/components/UI/UpdateProfile";
import { useGetProfile } from "@/hooks/user.hook";
import { Avatar } from "@nextui-org/react";

const ProfileUpdates = () => {
  const { data: userData, isLoading, isError } = useGetProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading profile.</div>;
  }
  const user = userData?.data;

  return (
    <div>
      {/* <h1>Profile Updates</h1> */}
      <div className="container mx-auto lg:p-4 ">
        <div className="bg-white shadow-md rounded-lg pb-20 dark:bg-black">
          <div className="relative ">
            <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
            <div className="absolute top-32 left-5">
              <Avatar src={user?.image} className="w-20 h-20 text-large" />
            </div>
          </div>
          <div className="lg:flex justify-between items-center">
            <div className="pt-16 pb-4 px-5">
              <h1 className="text-2xl font-bold">
                {user?.name || "User Name"}
              </h1>
              <p className="text-gray-600">
                {user?.email || "Bio or a brief description of the user."}
              </p>
            </div>
          </div>
          <div className="px-5">
            <UpdateProfile user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdates;
