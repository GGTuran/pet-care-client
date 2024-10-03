/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import CreatePost from "@/components/UI/CreatePost";
import Loading from "@/components/UI/Loading";
import PostCard from "@/components/UI/PostCard";
import { useGetPost } from "@/hooks/post.hook";
import { Button } from "@nextui-org/react";
import { Plus, Search, Filter, X } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

const NewsFeed = () => {
  const [category, setCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [visiblePosts, setVisiblePosts] = useState<any[]>([]); // For managing visible posts
  const [hasMore, setHasMore] = useState<boolean>(true);
  const CHUNK_SIZE = 2; // Number of posts to load per scroll

  // Update hook to pass the selected category and search term
  const {
    data: fetchedPosts,
    isLoading,
    refetch,
  } = useGetPost(category, debouncedSearchTerm);
  const posts = fetchedPosts?.data;

  const [isMenuOpen, setIsMenuOpen] = useState(false); // For filter modal
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Initialize visible posts when posts are fetched
  useEffect(() => {
    if (posts?.length > 0) {
      setVisiblePosts(posts?.slice(0, CHUNK_SIZE)); // Load initial chunk of posts
      setHasMore(posts?.length > CHUNK_SIZE); // Check if there are more posts to load
    }
  }, [posts]);

  // Function to load more posts on scroll
  const fetchMoreData = () => {
    if (visiblePosts?.length >= posts?.length) {
      setHasMore(false); // No more posts to load
      return;
    }

    // Load more posts
    const nextPosts = posts.slice(
      visiblePosts?.length,
      visiblePosts?.length + CHUNK_SIZE
    );
    setVisiblePosts((prevPosts) => [...prevPosts, ...nextPosts]);
  };

  // console.log(visiblePosts, "visible post");

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
          <InfiniteScroll
            dataLength={visiblePosts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loading />}
            endMessage={<p className="text-center">You have seen it all!</p>}
          >
            {visiblePosts.map((post: any) => (
              <PostCard key={post.id} post={post} reloadPost={refetch} />
            ))}
          </InfiniteScroll>
        </div>

        {/* Right Sidebar (Search and Filter Options) */}
        <div className="w-1/4 space-y-6">
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
            <Button
              onClick={() => setCategory("all")}
              className="w-full px-4 py-2 rounded-full"
            >
              All
            </Button>
            <Button
              onClick={() => setCategory("tip")}
              className="w-full px-4 py-2 rounded-full"
            >
              Tips
            </Button>
            <Button
              onClick={() => setCategory("story")}
              className="w-full px-4 py-2 rounded-full"
            >
              Stories
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="flex justify-between items-center mb-6">
          {/* Post Button */}
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition flex items-center"
          >
            <Plus className="mr-2" />
          </button>

          {/* Search Input */}
          <div className="relative w-full mx-4">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute top-2.5 right-3 text-gray-400" />
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition flex items-center"
          >
            <Filter className="mr-2" /> Menu
          </button>
        </div>

        {/* Posts Section for Mobile */}
        <div className="space-y-6">
          <InfiniteScroll
            dataLength={visiblePosts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loading />}
            endMessage={<p className="text-center">You have seen it all!</p>}
          >
            {visiblePosts.map((post: any) => (
              <PostCard key={post.id} post={post} reloadPost={refetch} />
            ))}
          </InfiniteScroll>
        </div>

        {/* Conditional Rendering for Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-80 relative">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-2 right-2 text-gray-600"
              >
                <X />
              </button>
              {/* Filter Options */}
              <div className="space-y-2">
                <Button
                  onClick={() => setCategory("all")}
                  className="w-full px-4 py-2 rounded-full"
                >
                  All
                </Button>
                <Button
                  onClick={() => setCategory("tip")}
                  className="w-full px-4 py-2 rounded-full"
                >
                  Tips
                </Button>
                <Button
                  onClick={() => setCategory("story")}
                  className="w-full px-4 py-2 rounded-full"
                >
                  Stories
                </Button>
              </div>
            </div>
          </div>
        )}
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
