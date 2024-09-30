"use client";
import CreatePost from "@/components/UI/CreatePost";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/UI/Loading";
import { useGetPost } from "@/hooks/post.hook";
import { Button } from "@nextui-org/react";
import {
  ArrowBigDown,
  ArrowBigUp,
  Plus,
  Search,
  Filter,
  X,
} from "lucide-react";
import React, { useState } from "react";

const NewsFeed = () => {
  const { data: fetchedPosts, isLoading } = useGetPost();
  const posts = fetchedPosts?.data || []; // Fallback to empty array if no posts are available

  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu modal

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Layout for large screens */}
      <div className="hidden lg:flex space-x-6">
        {/* Left Sidebar */}
        <div className="w-1/4 space-y-6">
          {/* Search Bar */}
          <div className="relative">
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

          {/* Add Post Button */}
          {/* <Button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition flex items-center"> */}
          <CreatePost></CreatePost>
          {/* </Button> */}
        </div>

        {/* Posts Section */}
        <div className="w-3/4 space-y-6">
          {posts.map((post: any) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* User and Post Info */}
              <div className="flex items-center px-4 py-3">
                <img
                  src={
                    post.userImage ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt={post.user}
                  className="rounded-full w-12 h-12"
                />
                <div className="ml-4">
                  <p className="font-semibold">{post.user}</p>
                  <p className="text-gray-400 text-sm">{post.title}</p>
                </div>
              </div>

              {/* Post Image */}
              <img
                src={
                  post.image ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt={post.title}
                className="w-full object-cover h-72"
              />

              {/* Post Content */}
              <div className="p-4">
                <p className="text-gray-800 mb-4">{post.content}</p>

                {/* Upvote/Downvote and Comment Count */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    {/* Upvote Button */}
                    <button className="flex items-center text-green-500 hover:text-green-600 transition">
                      <ArrowBigUp className="mr-2" />
                      {post.upVotes}
                    </button>
                    {/* Downvote Button */}
                    <button className="flex items-center text-red-500 hover:text-red-600 transition">
                      <ArrowBigDown className="mr-2" />
                      {post.downVotes}
                    </button>
                  </div>
                  {/* Comment Count */}
                  <p className="text-gray-600">
                    {post.comments?.length || 0} Comments
                  </p>
                </div>

                {/* Comments Section */}
                <div className="mt-4 space-y-2">
                  {post.comments?.length > 0 ? (
                    post.comments.map((comment: any, index: number) => (
                      <p key={index} className="text-gray-700">
                        <span className="font-semibold">
                          {comment.username || "User"}:
                        </span>{" "}
                        {comment.text || comment}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-500">No comments yet.</p>
                  )}
                </div>

                {/* Add Comment */}
                <div className="flex mt-4">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition">
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">News Feed</h1>
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
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* User and Post Info */}
              <div className="flex items-center px-4 py-3">
                <img
                  src={
                    post.userImage ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt={post.user}
                  className="rounded-full w-12 h-12"
                />
                <div className="ml-4">
                  <p className="font-semibold">{post.user}</p>
                  <p className="text-gray-400 text-sm">{post.title}</p>
                </div>
              </div>

              {/* Post Image */}
              <img
                src={
                  post.image ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt={post.title}
                className="w-full object-cover h-48"
              />

              {/* Post Content */}
              <div className="p-4">
                <p className="text-gray-800 mb-4">
                  {post.content.slice(0, 15)}
                </p>

                {/* Upvote/Downvote and Comment Count */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    {/* Upvote Button */}
                    <button className="flex items-center text-green-500 hover:text-green-600 transition">
                      <ArrowBigUp className="mr-2" />
                      {post.upVotes}
                    </button>
                    {/* Downvote Button */}
                    <button className="flex items-center text-red-500 hover:text-red-600 transition">
                      <ArrowBigDown className="mr-2" />
                      {post.downVotes}
                    </button>
                  </div>
                  {/* Comment Count */}
                  <p className="text-gray-600">
                    {post.comments?.length || 0} Comments
                  </p>
                </div>

                {/* Comments Section */}
                <div className="mt-4 space-y-2">
                  {post.comments?.length > 0 ? (
                    post.comments.map((comment: any, index: number) => (
                      <p key={index} className="text-gray-700">
                        <span className="font-semibold">
                          {comment.username || "User"}:
                        </span>{" "}
                        {comment.text || comment}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-500">No comments yet.</p>
                  )}
                </div>

                {/* Add Comment */}
                <div className="flex mt-4">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition">
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-80 relative">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <X />
            </button>

            <div className="space-y-4">
              <Button className="w-full px-4 py-2 rounded-full">All</Button>
              <Button className="w-full px-4 py-2 rounded-full">
                Most Upvoted
              </Button>
              <Button className="w-full px-4 py-2 rounded-full">Newest</Button>

              <Button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition flex items-center">
                <Plus className="mr-2" /> Add Post
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
