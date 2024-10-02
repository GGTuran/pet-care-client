/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import UpdateProfile from "@/components/UI/UpdateProfile";
import { useGetProfile } from "@/hooks/user.hook";
import { Avatar } from "@nextui-org/react";

import PostCard from "@/components/UI/PostCard";
import nexiosInstance from "@/config/nexios.config";
import UserFollowersModal from "@/components/UI/UserFollowers";
import Following from "@/components/UI/Following";

const ProfilePage = () => {
  const {
    data: userData,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetProfile();
  const [userPosts, setUserPosts] = useState<any[]>([]);

  const user = userData?.data;

  // Fetch user-specific posts
  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const { data }: any = await nexiosInstance.get(`/post/${user._id}`, {
          cache: "no-store",
          next: {
            tags: ["POST"],
          },
        });
        setUserPosts(data?.data || []); // Update the userPosts state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getUserPosts();
  }, [user?._id]);

  console.log(userPosts, "posts");

  if (profileLoading) {
    return <div>Loading...</div>;
  }

  if (profileError) {
    return <div>Error loading profile or posts.</div>;
  }

  return (
    <div>
      <div className="container mx-auto lg:p-4 ">
        <div className="bg-white shadow-md rounded-lg pb-20 dark:bg-black">
          <div className="relative">
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
          <div className="m-2 flex justify-between">
            <div className="">
              <UpdateProfile user={user} />
            </div>
            <div className="flex justify-between">
              {" "}
              <div className="mr-2">
                <UserFollowersModal />
              </div>
              <div className="">
                <Following />
              </div>
            </div>
          </div>
        </div>

        {/* Render user-specific posts */}
        <div className="mt-6 flex justify-center">
          <div className="space-y-4 max-w-3xl w-full">
            {userPosts.length > 0 ? (
              userPosts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No posts found for this user.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
