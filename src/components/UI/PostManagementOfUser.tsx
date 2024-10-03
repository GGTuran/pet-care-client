/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import nexiosInstance from "@/config/nexios.config";
import { useDeletePost } from "@/hooks/post.hook";
import { useGetProfile } from "@/hooks/user.hook";
import { useEffect, useState } from "react";

const PostManagementOfUser = () => {
  const { mutate: deletePost } = useDeletePost();

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
            tags: ["user-posts"],
          },
        });
        setUserPosts(data?.data || []); // Update the userPosts state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getUserPosts();
  }, [user?._id]);

  // console.log(userPosts, "posts");

  const handleDelete = (postId: string) => {
    deletePost(postId);
  };

  return <div></div>;
};

export default PostManagementOfUser;
