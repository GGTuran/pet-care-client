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
import { ChangeEvent, useState } from "react";
import Loading from "@/app/(commonLayout)/loading";
import { useCreatePost } from "@/hooks/post.hook";
import { useUser } from "@/context/user.provider";
import PCInput from "../form/PCInput";
import PCTextarea from "../form/PCTextArea";
import PCSelect from "../form/PCSelect";

export default function CreatePost() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess,
  } = useCreatePost();
  const { user } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  let categoryOption: { key: string; label: string }[] = [
    { key: "tip", label: "Tip" },
    { key: "story", label: "Story" },
  ];

  const methods = useForm();
  const { handleSubmit, register } = methods;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    // Add non-file data to the formData object
    const postData = {
      title: data.title,
      content: data.content,
      category: data.category,
      premium: data.premium === true || data.premium === "true" ? true : false, // Handle the boolean value
      author: user?.userId,
    };

    formData.append("data", JSON.stringify(postData));

    // Add images to the formData object
    imageFiles.forEach((image) => {
      formData.append("image", image);
    });

    // Submit the form data using mutation hook
    handleCreatePost(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files!); // Allow multiple file selection
    setImageFiles((prev) => [...prev, ...files]);

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
        Create New Post
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
                    <PCInput label="Title" name="title" />
                    <PCTextarea label="Content" name="content" />
                    <PCSelect
                      label="Category"
                      name="category"
                      options={categoryOption}
                    />

                    {/* New Checkbox for Premium */}
                    <div className="flex items-center space-x-3 mt-4">
                      <input
                        type="checkbox"
                        id="premium"
                        {...register("premium")}
                      />
                      <label htmlFor="premium">Premium Post</label>
                    </div>

                    <label
                      className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400 mt-5"
                      htmlFor="image"
                    >
                      Upload image
                    </label>
                    <input
                      multiple
                      className="hidden"
                      id="image"
                      type="file"
                      onChange={handleImageChange}
                    />

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
