/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import nexiosInstance from "@/config/nexios.config";
import { useGetProfile } from "@/hooks/user.hook";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Avatar,
  Button,
} from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { handleUserTestReportPdf } from "@/utils/PdfPrint";
import PDFModal from "./PDFModal";

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const { data: userData } = useGetProfile();
  const user = userData?.data;

  //generate pdf
  const handlePDF = (age: number, weight: number) => {
    handleUserTestReportPdf({ age, weight });
  };

  // Fetch user-specific posts
  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const { data }: any = await nexiosInstance.get(`/post/${user?._id}`, {
          cache: "no-store",
          next: {
            tags: ["POST"],
          },
        });
        setUserPosts(data?.data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (user?._id) getUserPosts();
  }, [user?._id]);

  const handleDelete = async (postId: string) => {
    try {
      await nexiosInstance.delete(`/post/${postId}`);
      setUserPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Add the required columns including user details
  const columns = [
    { uid: "userImage", name: "User Image" },
    { uid: "title", name: "Title" },
    { uid: "userName", name: "User Name" },
    { uid: "userEmail", name: "User Email" },
    { uid: "actions", name: "Actions" },
  ];

  const renderCell = (post: any, columnKey: string) => {
    switch (columnKey) {
      case "title":
        return <span className="text-sm text-gray-600">{post.title}</span>;
      case "userImage":
        return (
          <Avatar
            src={user?.image || "/default-avatar.png"}
            alt={user?.name}
            className="w-8 h-8 rounded-full"
          />
        );
      case "userName":
        return <span className="text-sm text-gray-600">{user?.name}</span>;
      case "userEmail":
        return <span className="text-sm text-gray-600">{user?.email}</span>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Delete Post">
              <span
                className="text-lg text-gray-500 cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => handleDelete(post?._id)}
              >
                <Trash2 />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <span className="text-sm text-gray-600">{post[columnKey]}</span>;
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      {/* <div className="flex justify-between ">
        <div className="flex justify-center items-center"> */}
      <h1 className="text-2xl mx-auto font-semibold mb-6">My Posts</h1>
      <div className="m-5 ">
        {" "}
        <PDFModal />
      </div>
      {/* </div>
        <div className="flex justify-between"> */}
      {/* <div className="mr-2">
            <UserFollowersModal />
          </div>
          <div className="">
            <Following />
          </div> */}
      {/* </div>
      </div> */}
      <div className="overflow-x-auto">
        <div className="hidden md:block">
          <Table
            aria-label="User posts table"
            className="w-full min-w-full table-auto"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  className="text-left text-gray-500 text-sm"
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={userPosts}>
              {(post) => (
                <TableRow
                  key={post._id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  {(columnKey) => (
                    <TableCell className="py-3 px-5">
                      {renderCell(post, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile/Tablet Responsive Card Design */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {userPosts.map((post) => (
            <div
              key={post._id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="mb-2">
                <p className="text-lg font-semibold">{post.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <Avatar
                  src={user?.image || "/default-avatar.png"}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <div className="flex justify-end items-center mt-2">
                <Tooltip color="danger" content="Delete Post">
                  <span
                    className="text-lg text-gray-500 cursor-pointer hover:text-red-500 transition-colors"
                    onClick={() => handleDelete(post._id)}
                  >
                    <Trash2 />
                  </span>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
