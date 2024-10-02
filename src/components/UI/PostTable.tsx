"use client";

import { useDeletePost, useGetPost } from "@/hooks/post.hook";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Avatar,
} from "@nextui-org/react";
import { Trash2 } from "lucide-react";

const PostTable = () => {
  const { data, refetch } = useGetPost("", "");
  const { mutate: deletePost } = useDeletePost();
  const posts = data?.data || [];

  const handleDelete = (postId: string) => {
    deletePost(postId, {
      onSuccess: () => {
        refetch(); // Refetch posts to update UI after deletion
      },
      onError: (error) => {
        console.error("Error deleting post:", error);
      },
    });
  };

  const columns = [
    { uid: "author", name: "Author" },
    { uid: "title", name: "Title" },
    { uid: "actions", name: "Actions" },
  ];

  const renderCell = (post, columnKey) => {
    const cellValue = post[columnKey];
    switch (columnKey) {
      case "author":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: post.author.image || "/default-avatar.png",
            }}
            description={post.author.email}
            name={post.author.name}
          />
        );
      case "title":
        return <span className="text-sm text-gray-600">{post.title}</span>;
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
        return <span className="text-sm text-gray-600">{cellValue}</span>;
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl font-semibold mb-6">All Posts</h1>
      <div className="overflow-x-auto">
        <div className="hidden md:block">
          <Table
            aria-label="Posts table"
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
            <TableBody items={posts}>
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
          {posts.map((post) => (
            <div
              key={post._id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex items-center gap-4 mb-2">
                <Avatar
                  src={post.author.image || "/default-avatar.png"}
                  alt={post.author.name}
                  className="w-20 h-20 text-large"
                />
                <div>
                  <p className="text-lg font-semibold">{post.author.name}</p>
                  <p className="text-sm text-gray-600">{post.title}</p>
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

export default PostTable;
