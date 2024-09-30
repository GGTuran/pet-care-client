"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowBigDown,
  ArrowBigUp,
  Plus,
  Search,
  Filter,
  X,
} from "lucide-react";
import React, { useState } from "react";

// Sample data to represent posts
const postsData = [
  {
    id: 1,
    title: "Beach Sunset",
    user: "john_doe",
    userImage: "https://via.placeholder.com/50",
    image: "https://via.placeholder.com/600",
    upVotes: 245,
    downVotes: 12,
    comments: [
      { id: 1, username: "alice", comment: "Awesome pic!" },
      { id: 2, username: "bob", comment: "Looks amazing!" },
    ],
    description: "Enjoying the sunset at the beach 🏖️",
  },
  {
    id: 2,
    title: "Mountain Hike",
    user: "jane_smith",
    userImage: "https://via.placeholder.com/50",
    image: "https://via.placeholder.com/600",
    upVotes: 134,
    downVotes: 5,
    comments: [{ id: 3, username: "charlie", comment: "Beautiful view!" }],
    description: "Hiking adventures in the mountains 🏔️",
  },
];

const NewsFeed = () => {
  const [posts, setPosts] = useState(postsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [newComment, setNewComment] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu modal

  const handleUpvote = (id: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, upVotes: post.upVotes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleDownvote = (id: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, downVotes: post.downVotes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleAddComment = (id: number, comment: any) => {
    const updatedPosts = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            comments: [
              ...post.comments,
              { id: Date.now(), username: "You", comment },
            ],
          }
        : post
    );
    setPosts(updatedPosts);
    setNewComment({ ...newComment, [id]: "" });
  };

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute top-2.5 right-3 text-gray-400" />
          </div>

          {/* Filter Options */}
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
              All
            </button>
            <button className="w-full px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
              Most Upvoted
            </button>
            <button className="w-full px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
              Newest
            </button>
          </div>

          {/* Add Post Button */}
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition flex items-center">
            <Plus className="mr-2" /> Add Post
          </button>
        </div>

        {/* Posts Section */}
        <div className="w-3/4 space-y-6">
          {posts
            .filter((post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* User and Post Info */}
                <div className="flex items-center px-4 py-3">
                  <img
                    src={post.userImage}
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
                  src={post.image}
                  alt="Post image"
                  className="w-full object-cover h-72"
                />

                {/* Post Content */}
                <div className="p-4">
                  <p className="text-gray-800 mb-4">{post.description}</p>

                  {/* Upvote/Downvote and Comment Count */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      {/* Upvote Button */}
                      <button
                        onClick={() => handleUpvote(post.id)}
                        className="flex items-center text-green-500 hover:text-green-600 transition"
                      >
                        <ArrowBigUp className="mr-2" />
                        {post.upVotes}
                      </button>
                      {/* Downvote Button */}
                      <button
                        onClick={() => handleDownvote(post.id)}
                        className="flex items-center text-red-500 hover:text-red-600 transition"
                      >
                        <ArrowBigDown className="mr-2" />
                        {post.downVotes}
                      </button>
                    </div>
                    {/* Comment Count */}
                    <p className="text-gray-600">
                      {post.comments.length} Comments
                    </p>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-4 space-y-2">
                    {post.comments.map((comment) => (
                      <p key={comment.id} className="text-gray-700">
                        <span className="font-semibold">
                          {comment.username}:
                        </span>{" "}
                        {comment.comment}
                      </p>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="flex mt-4">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment[post.id] || ""}
                      onChange={(e) =>
                        setNewComment({
                          ...newComment,
                          [post.id]: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
                    />
                    <button
                      onClick={() =>
                        handleAddComment(post.id, newComment[post.id])
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
                    >
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
          {posts
            .filter((post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* User and Post Info */}
                <div className="flex items-center px-4 py-3">
                  <img
                    src={post.userImage}
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
                  src={post.image}
                  alt="Post image"
                  className="w-full object-cover h-48"
                />

                {/* Post Content */}
                <div className="p-4">
                  <p className="text-gray-800 mb-4">{post.description}</p>

                  {/* Upvote/Downvote and Comment Count */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      {/* Upvote Button */}
                      <button
                        onClick={() => handleUpvote(post.id)}
                        className="flex items-center text-green-500 hover:text-green-600 transition"
                      >
                        <ArrowBigUp className="mr-2" />
                        {post.upVotes}
                      </button>
                      {/* Downvote Button */}
                      <button
                        onClick={() => handleDownvote(post.id)}
                        className="flex items-center text-red-500 hover:text-red-600 transition"
                      >
                        <ArrowBigDown className="mr-2" />
                        {post.downVotes}
                      </button>
                    </div>
                    {/* Comment Count */}
                    <p className="text-gray-600">
                      {post.comments.length} Comments
                    </p>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-4 space-y-2">
                    {post.comments.map((comment) => (
                      <p key={comment.id} className="text-gray-700">
                        <span className="font-semibold">
                          {comment.username}:
                        </span>{" "}
                        {comment.comment}
                      </p>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="flex mt-4">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment[post.id] || ""}
                      onChange={(e) =>
                        setNewComment({
                          ...newComment,
                          [post.id]: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
                    />
                    <button
                      onClick={() =>
                        handleAddComment(post.id, newComment[post.id])
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
                    >
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
              className="absolute top-2 right-2 text-gray-600"
            >
              <X size={24} />
            </button>

            {/* Search Bar */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute top-2.5 right-3 text-gray-400" />
            </div>

            {/* Filter Options */}
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
                All
              </button>
              <button className="w-full px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
                Most Upvoted
              </button>
              <button className="w-full px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
                Newest
              </button>
            </div>

            {/* Add Post Button */}
            <button className="w-full bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg shadow-lg hover:bg-blue-600 transition flex items-center">
              <Plus className="mr-2" /> Add Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
