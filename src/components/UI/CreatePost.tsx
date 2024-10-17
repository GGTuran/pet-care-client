/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/(commonLayout)/loading";
import { useCreatePost } from "@/hooks/post.hook";
import { useUser } from "@/context/user.provider";
import PCInput from "../form/PCInput";
import PCSelect from "../form/PCSelect";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import { getCurrentUser } from "@/services/AuthService";

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function CreatePost() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [content, setContent] = useState(""); // State to hold Quill content

  const { mutate: handleCreatePost, isPending: createPostPending } =
    useCreatePost();

  const [user, setUser] = useState<any>();
  useEffect(() => {
    const getUser = async () => {
      const result = await getCurrentUser();
      setUser(result);
    };
    getUser();
  }, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const methods = useForm();
  const { handleSubmit, register } = methods;

  const categoryOptions = [
    { key: "tip", label: "Tip" },
    { key: "story", label: "Story" },
  ];

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    // Collect all the post data
    const postData = {
      title: data?.title,
      content, // Use the Quill editor's state
      category: data.category,
      premium: data.premium === true || data.premium === "true",
      author: user?.userId,
    };

    formData.append("data", JSON.stringify(postData));

    // Append selected images to formData
    imageFiles.forEach((image) => formData.append("image", image));

    // Submit form data using mutation hook
    handleCreatePost(formData, {
      onSuccess: () => {
        //reset form fields
        methods.reset();

        //clearing quill and image preview
        setContent("");
        setImageFiles([]);
        setImagePreviews([]);
      },
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []); // Safely get selected files
    setImageFiles((prev) => [...prev, ...files]);

    // Generate previews for the selected images
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Post
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create a Post
              </ModalHeader>
              <ModalBody>
                {createPostPending && <Loading />}

                <FormProvider {...methods}>
                  <form
                    onSubmit={handleSubmit((data) => {
                      onSubmit(data); // Call submit handler
                      onClose(); // Close modal after submission
                    })}
                  >
                    {/* Title Field */}
                    <PCInput label="Title" name="title" />

                    {/* Quill Editor */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Content
                      </label>
                      <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        placeholder="Write your content..."
                      />
                    </div>

                    {/* Category Select Field */}
                    <PCSelect
                      label="Category"
                      name="category"
                      options={categoryOptions}
                    />

                    {/* Premium Checkbox */}
                    <div className="flex items-center space-x-3 mt-4">
                      <input
                        type="checkbox"
                        id="premium"
                        {...register("premium")}
                      />
                      <label htmlFor="premium">Premium Post</label>
                    </div>

                    {/* Image Upload */}
                    <label
                      className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400 mt-5"
                      htmlFor="image"
                    >
                      Upload image(Standard size 640x850 )
                    </label>
                    <input
                      multiple
                      className="hidden"
                      id="image"
                      type="file"
                      onChange={handleImageChange}
                    />

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                      <div className="flex gap-5 my-5 flex-wrap">
                        {imagePreviews.map((imageDataUrl, index) => (
                          <div
                            key={index}
                            className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                          >
                            <img
                              alt="item"
                              className="h-full w-full object-cover object-center rounded-md"
                              src={imageDataUrl}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <Divider className="my-5" />

                    {/* Post Preview */}
                    {/* <div className="mb-4">
                      <h3 className="text-lg font-bold">Post Preview:</h3>
                      <h4 className="font-semibold">
                        {methods.getValues("title")}
                      </h4>
                      <div
                        className="mt-2"
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    </div> */}

                    {/* Modal Footer */}
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" type="submit">
                        Post
                      </Button>
                    </ModalFooter>
                  </form>
                </FormProvider>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
