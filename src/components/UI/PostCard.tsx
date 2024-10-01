/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUpvotePost } from "@/hooks/post.hook"; // Ensure you import the upvote hook
import { useDownVotePost } from "@/hooks/post.hook"; // Import the downvote hook
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@nextui-org/react";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

const PostCard = ({ post }: { post: any }) => {
  const { mutate: upvotePostMutation, isPending: upvoteLoading } =
    useUpvotePost();
  const { mutate: downvotePostMutation, isPending: downvoteLoading } =
    useDownVotePost(); // Use the downvote mutation hook

  // Function to handle upvote
  const handleUpvote = () => {
    if (!upvoteLoading) {
      console.log(post._id, "id");
      upvotePostMutation(post._id); // Call the mutation with post ID
    }
  };

  // Function to handle downvote
  const handleDownvote = () => {
    if (!downvoteLoading) {
      console.log(post._id, "id");
      downvotePostMutation(post._id); // Call the downvote mutation with post ID
    }
  };

  return (
    <Card className="max-w-[500px] w-full mb-6 shadow-lg">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {post.author.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {post.author?.email}
            </h5>
          </div>
        </div>
        <Button
          className="bg-transparent text-foreground"
          color="primary"
          radius="full"
          size="sm"
          variant="bordered"
        >
          Follow
        </Button>
      </CardHeader>

      <CardBody className="px-3 py-0 text-small text-default-400">
        {post.image && (
          <div className="flex justify-center items-center">
            <Image
              src={post.image}
              alt={post.title}
              className="object-cover rounded-lg max-h-full max-w-full"
            />
          </div>
        )}
        <h4 className="font-semibold pt-2">{post.title}</h4>
        <p className="text-default-600">{post.content}</p>
        <span className="pt-2">#{post.category}</span>
        {post.premium && (
          <span className="ml-2 px-2 py-1 bg-yellow-200 text-yellow-700 text-xs rounded-full">
            Premium
          </span>
        )}
      </CardBody>

      <CardFooter className="flex justify-start gap-3">
        <div className="flex gap-1 items-center">
          <Button
            isDisabled={upvoteLoading} // Disable button while the upvote request is loading
            onPress={handleUpvote} // Trigger the upvote action on click
            className="p-0"
            variant="ghost"
            aria-label="Upvote"
          >
            <ArrowBigUp />
          </Button>
          <p className="font-semibold text-default-400 text-small">
            {post.upVotes}
          </p>
        </div>
        <div className="flex gap-1 items-center">
          <Button
            isDisabled={downvoteLoading} // Disable button while the downvote request is loading
            onPress={handleDownvote} // Trigger the downvote action on click
            className="p-0"
            variant="ghost"
            aria-label="Downvote"
          >
            <ArrowBigDown />
          </Button>
          <p className="font-semibold text-default-400 text-small">
            {post.downVotes}
          </p>
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
