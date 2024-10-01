"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@nextui-org/react";

import { TPost } from "@/types";

const PostCard = ({ post }: { post: TPost }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State to track content expansion

  // Function to handle "Show More" button click for premium posts
  const handleShowMore = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  return (
    <Card className="max-w-[500px] w-full mb-6 shadow-lg">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          {/* Avatar or profile image */}
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              Author name
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              post.author.email
            </h5>
          </div>
        </div>
        <Button
          className={isFollowed ? "bg-transparent text-foreground" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>

      <CardBody className="px-3 py-0 text-small text-default-400">
        {/* Post Image */}
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            className="w-full h-[200px] object-cover rounded-lg"
          />
        )}

        {/* Post Title */}
        <h4 className="font-semibold pt-2">{post.title}</h4>

        {/* Post Content: Toggle between truncated and full content */}
        <p className="text-default-600">
          {post.premium && !isExpanded ? (
            <>
              {post.content.slice(0, 100)}...{" "}
              <Button
                className="inline-block text-blue-500"
                onClick={handleShowMore}
              >
                Show More
              </Button>
            </>
          ) : (
            post.content
          )}
        </p>

        {/* Post Category and Premium Label */}
        <span className="pt-2">#{post.category}</span>
        {post.premium && (
          <span className="ml-2 px-2 py-1 bg-yellow-200 text-yellow-700 text-xs rounded-full">
            Premium
          </span>
        )}
      </CardBody>

      {/* Post Footer (Votes and Comments) */}
      <CardFooter className="flex justify-between gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            {post.upVotes}
          </p>
          <p className="text-default-400 text-small">Upvotes</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            {post.downVotes}
          </p>
          <p className="text-default-400 text-small">Downvotes</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            {post.comments?.length || 0}
          </p>
          <p className="text-default-400 text-small">Comments</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
