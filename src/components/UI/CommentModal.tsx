/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCreateComment } from "@/hooks/comment.hook";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useState } from "react";

interface CommentModalProps {
  postId: any;
  author: any;
}

export default function CommentModal({ postId, author }: CommentModalProps) {
  const [commentText, setCommentText] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate: createCommentMutation, isPending: commentLoading } =
    useCreateComment();

  // Handles comment submission
  const handleAddComment = () => {
    if (commentText.trim() && !commentLoading) {
      createCommentMutation({
        postId,
        author,
        text: commentText,
      });
      setCommentText(""); // Clear input after submission
      onOpenChange(); // Close modal after submission
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        comment
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add a Comment
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  placeholder="Type your comment here"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isDisabled={commentLoading || !commentText.trim()}
                  onPress={handleAddComment} // No need to pass parameters here since they're from props
                >
                  {commentLoading ? "Posting..." : "Post Comment"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
