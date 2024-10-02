/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import nexiosInstance from "@/config/nexios.config";
import { useEditComment } from "@/hooks/comment.hook";
import { deleteCommentFromDB, getCommentById } from "@/services/CommentService";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
  Input,
} from "@nextui-org/react";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Comment {
  _id?: string;
  author?: any;
  postId?: string;
  text?: string;
  data?: any;
}

export default function ShowComments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]); // Ensure this is an array
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const [commentToEdit, setCommentToEdit] = useState<Comment | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: editComment } = useEditComment();

  // Fetch comments on mount
  useEffect(() => {
    const getComment = async () => {
      const { data }: any = await nexiosInstance.get(`/comment/${postId}`, {
        cache: "no-store",
        next: {
          tags: ["comments"],
        },
      });
      console.log(data); // Debugging line
      setComments(data.comments || data); // Adjust based on your actual API response structure
    };
    getComment();
  }, [postId]);

  // Delete comment when commentToDelete changes
  useEffect(() => {
    const deleteComment = async () => {
      if (commentToDelete) {
        try {
          await deleteCommentFromDB(commentToDelete);
          setComments((prev) =>
            prev.filter((comment: Comment) => comment._id !== commentToDelete)
          );
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

  // Trigger comment edit
  const handleEdit = (comment: Comment) => {
    setCommentToEdit(comment);
    setEditedText(comment.text || ""); // Safely set initial text
  };

  const handleSaveEdit = () => {
    if (commentToEdit) {
      editComment(
        { id: commentToEdit._id as string, commentData: { text: editedText } },
        {
          onSuccess: async () => {
            // await getCommentById(id); // Re-fetch comments after successful edit
            setCommentToEdit(null);
            setEditedText("");
          },
        }
      );
    }
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
                {comments?.data?.map(
                  (
                    comment: any // Use comments directly
                  ) => (
                    <div
                      key={comment._id}
                      className="flex items-center gap-3 mb-4"
                    >
                      <Avatar
                        src={comment.author?.image}
                        alt={comment.author?.name}
                      />
                      <div>
                        <p className="font-semibold">{comment.author?.name}</p>
                        {commentToEdit && commentToEdit._id === comment._id ? (
                          <>
                            <Input
                              value={editedText}
                              onChange={(e) => setEditedText(e.target.value)}
                              placeholder="Edit your comment"
                            />
                            <Button onPress={handleSaveEdit} color="success">
                              Save
                            </Button>
                          </>
                        ) : (
                          <p>{comment.text}</p>
                        )}
                      </div>
                      {/* Edit button for each comment */}
                      {!commentToEdit && (
                        <Button
                          onPress={() => handleEdit(comment)}
                          color="primary"
                        >
                          Edit
                        </Button>
                      )}
                      {/* Delete button for each comment */}
                      <Button
                        color="danger"
                        onPress={() => handleDelete(comment?._id as string)}
                      >
                        Delete
                      </Button>
                    </div>
                  )
                )}
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
