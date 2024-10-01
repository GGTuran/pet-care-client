/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import CreatePost from "@/components/UI/CreatePost";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/UI/Loading";
import PostCard from "@/components/UI/PostCard";
import { useGetPost } from "@/hooks/post.hook";
import { Button } from "@nextui-org/react";
import { Plus, Search, Filter } from "lucide-react";
import React, { useState } from "react";

const NewsFeed = () => {
  const { data: fetchedPosts, isLoading } = useGetPost();
  const posts = fetchedPosts?.data || []; // Fallback to empty array if no posts are available

  const [isMenuOpen, setIsMenuOpen] = useState(false); // For filter modal
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Layout for large screens */}
      <div className="hidden lg:flex">
        {/* Left Sidebar (Create Post Button) */}
        <div className="w-1/4 space-y-6">
          <CreatePost />
        </div>

        {/* Posts Section in the middle */}
        <div className="w-1/2 space-y-6 mx-6">
          {" "}
          {/* Added margin-x for spacing */}
          {posts.map((post: any) => (
            <PostCard key={post.id} post={post} /> // Reuse PostCard for each post
          ))}
        </div>

        {/* Right Sidebar (Search and Filter Options) */}
        <div className="w-1/4 space-y-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            {" "}
            {/* Added margin-bottom for spacing */}
            <input
              type="text"
              placeholder="Search posts..."
              className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute top-2.5 right-3 text-gray-400" />
          </div>

          {/* Filter Options */}
          <div className="space-y-2">
            <Button className="w-full px-4 py-2 rounded-full">All</Button>
            <Button className="w-full px-4 py-2 rounded-full">
              Most Upvoted
            </Button>
            <Button className="w-full px-4 py-2 rounded-full">Newest</Button>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="flex justify-between items-center mb-6">
          {/* Post Button (Left) */}
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition flex items-center"
          >
            <Plus className="mr-2" /> Post
          </button>

          {/* Search Input (Middle) */}
          <div className="relative w-full mx-4">
            <input
              type="text"
              placeholder="Search posts..."
              className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute top-2.5 right-3 text-gray-400" />
          </div>

          {/* Menu Button (Right) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition flex items-center"
          >
            <Filter className="mr-2" /> Menu
          </button>
        </div>

        {/* Posts Section for Mobile */}
        <div className="space-y-6">
          {posts.map((post: any) => (
            <PostCard key={post._id} post={post} /> // Reuse PostCard for each post in mobile view as well
          ))}
        </div>
      </div>

      {/* Post Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-80 relative">
            <button
              onClick={() => setIsPostModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600"
            >
              X
            </button>
            <CreatePost />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
