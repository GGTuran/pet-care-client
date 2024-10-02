/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import nexiosInstance from "@/config/nexios.config";
import { deleteCommentFromDB } from "@/services/CommentService";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";

import { MessageCircle } from "lucide-react";

import { useEffect, useState } from "react";

interface Comment {
  _id: string;
  author: {
    name: string;
    image: string;
  };
  text: string;
}

export default function ShowComments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<any>([]);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Fetch comments on mount
  useEffect(() => {
    const getComment = async () => {
      const { data }: any = await nexiosInstance.get(`/comment/${postId}`, {
        cache: "no-store",
        next: {
          tags: ["comments"],
        },
      });
      setComments(data);
    };
    getComment();
  }, [postId]);

  // Delete comment when commentToDelete changes
  useEffect(() => {
    const deleteComment = async () => {
      if (commentToDelete) {
        try {
          await deleteCommentFromDB(commentToDelete);
        } catch (error) {
          console.error("Error deleting comment:", error);
        }
      }
    };
    deleteComment();
  }, [commentToDelete]);

  // Trigger comment deletion
  const handleDelete = (commentId: string) => {
    setCommentToDelete(commentId);
  };

  return (
    <>
      <Button onPress={onOpen}>
        <MessageCircle />{" "}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Comments
              </ModalHeader>
              <ModalBody>
                {comments?.data?.map((comment: Comment) => (
                  <div
                    key={comment._id}
                    className="flex items-center gap-3 mb-4"
                  >
                    <Avatar
                      src={comment.author.image}
                      alt={comment.author.name}
                    />
                    <div>
                      <p className="font-semibold">{comment.author.name}</p>
                      <p>{comment.text}</p>
                    </div>
                    {/* Delete button for each comment */}
                    <Button
                      color="danger"
                      onPress={() => handleDelete(comment._id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
