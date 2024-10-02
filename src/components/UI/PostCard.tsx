/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUpvotePost, useDownVotePost } from "@/hooks/post.hook"; // Import the follow user hook
import { useFollowUser } from "@/hooks/user.hook";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@nextui-org/react";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import CommentModal from "./CommentModal";
import ShowComments from "./ShowComment";

const PostCard = ({ post }: { post: any }) => {
  const { mutate: upvotePostMutation, isPending: upvoteLoading } =
    useUpvotePost();
  const { mutate: downvotePostMutation, isPending: downvoteLoading } =
    useDownVotePost();
  const { mutate: followUserMutation, isPending: followLoading } =
    useFollowUser(); // Use the follow user hook

  // console.log(user, "postCard");

  // Function to handle upvote
  const handleUpvote = () => {
    if (!upvoteLoading) {
      upvotePostMutation(post._id); // Call the mutation with post ID
    }
  };

  // console.log(post._id, "postId");
  // console.log(post, "comment");

  // Function to handle downvote
  const handleDownvote = () => {
    if (!downvoteLoading) {
      downvotePostMutation(post._id); // Call the mutation with post ID
    }
  };

  // Function to handle following a user
  const handleFollowUser = () => {
    if (!followLoading) {
      console.log(post?.author?._id, "id");
      followUserMutation(post.author._id);
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
          isDisabled={followLoading} // Disable button while follow request is loading
          className="bg-transparent text-foreground"
          color="primary"
          radius="full"
          size="sm"
          variant="bordered"
          onPress={handleFollowUser} // Trigger the follow action on click
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

      <CardFooter className="flex justify-between ">
        <div className="flex gap-1 items-center">
          <ArrowBigUp onClick={handleUpvote} />

          <p className="font-semibold text-default-400 text-small">
            {post.upVotes}
          </p>

          <ArrowBigDown onClick={handleDownvote} />

          <p className="font-semibold text-default-400 text-small">
            {post.downVotes}
          </p>
        </div>

        <div className="flex gap-1 items-center">
          <p className="font-semibold text-default-400 text-small">
            {post.comments?.length || 0}
          </p>
          <p className="text-default-400 text-small">
            {/* <MessageCircle> */}
            <ShowComments postId={post?._id} />
            {/* </MessageCircle> */}
          </p>
          <CommentModal postId={post?._id} author={post?.author?._id} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
