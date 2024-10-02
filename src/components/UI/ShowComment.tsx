/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import nexiosInstance from "@/config/nexios.config";
import { useGetComment } from "@/hooks/comment.hook";
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
  const [comments, setComments] = useState<any>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const getComment = async () => {
      const { data } = await nexiosInstance.get(`/comment/${postId}`, {
        cache: "no-store",
      });
      setComments(data);
    };
    getComment();
  }, [postId]);

  console.log(comments, "comment");

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
                {comments?.data.map((comment: Comment) => (
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
