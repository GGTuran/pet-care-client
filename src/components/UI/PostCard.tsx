/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUpvotePost, useDownVotePost, usePayment } from "@/hooks/post.hook"; // Import the follow user hook
import { useFollowUser, useGetProfile } from "@/hooks/user.hook";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@nextui-org/react";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import CommentModal from "./CommentModal";
import ShowComments from "./ShowComment";

const PostCard = ({ post }: { post: any }) => {
  const { data: userData, refetch } = useGetProfile();
  const { mutate: upvotePostMutation, isPending: upvoteLoading } =
    useUpvotePost();
  const { mutate: downvotePostMutation, isPending: downvoteLoading } =
    useDownVotePost();
  const { mutate: followUserMutation, isPending: followLoading } =
    useFollowUser();

  const { mutate: makePayment } = usePayment();

  const user = userData?.data;

  // Function to handle upvote
  const handleUpvote = () => {
    if (!upvoteLoading) {
      upvotePostMutation(post._id, {
        onSuccess: () => {
          refetch();
        },
      }); // Call the mutation with post ID
    }
  };

  // Function to handle downvote
  const handleDownvote = () => {
    if (!downvoteLoading) {
      downvotePostMutation(post._id, {
        onSuccess: () => {
          refetch();
        },
      }); // Call the mutation with post ID
    }
  };

  // Function to handle following a user
  const handleFollowUser = () => {
    if (!followLoading) {
      followUserMutation(post.author._id, {
        onSuccess: () => {
          refetch();
        },
      });
    }
  };

  // Function to handle payment for premium posts
  const handlePayment = () => {
    if (user) {
      makePayment(user?._id, {
        onSuccess: (data) => {
          window.location.href = data?.data?.paymentSession?.payment_url;
        },
      });
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

        {/* Conditional content rendering based on premium and user.isPaid */}
        {post.premium ? (
          user?.isPaid ? (
            <div>
              {/* Show the content if the user is paid */}
              <p
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="text-default-600"
              />
              <span className="pt-2">#{post.category}</span>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col py-4">
              {/* Show payment button if the user is not paid */}
              <p className="text-sm text-default-500 mb-2">
                This is a premium post. Please make a payment to view the
                content.
              </p>
              <Button
                onClick={handlePayment}
                className="bg-yellow-500 text-white rounded-full"
              >
                Unlock Premium Content
              </Button>
            </div>
          )
        ) : (
          <div>
            {/* Show the content if the post is not premium */}
            <p
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="text-default-600"
            />
            <span className="pt-2">#{post.category}</span>
          </div>
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
          <ShowComments postId={post?._id} />
          <CommentModal postId={post?._id} author={post?.author?._id} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
