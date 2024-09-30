/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
"use client";

import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { ChangeEvent, useState } from "react";
import Loading from "@/app/(commonLayout)/loading";
import { useRouter } from "next/navigation";
import { useCreatePost } from "@/hooks/post.hook";
import { useUser } from "@/context/user.provider";
import PCInput from "../form/PCInput";
import PCTextarea from "../form/PCTextArea";
import PCSelect from "../form/PCSelect";

export default function CreatePost() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const router = useRouter();

  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess,
  } = useCreatePost();

  const { user } = useUser();

  let categoryOption: { key: string; label: string }[] = [];

  // Assuming categoriesData is an object where you store your categories

  categoryOption = [
    { key: "tip", label: "Tip" },
    { key: "story", label: "Story" },
  ];

  const methods = useForm();
  const { control, handleSubmit } = methods;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const postData = {
      title: data.title,
      content: data.content,
      category: data.category,
      premium: data.premium || false,
      author: user!.userId,
    };

    console.log(postData, "post");

    formData.append("data", JSON.stringify(postData));

    for (let image of imageFiles) {
      formData.append("image", image);
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, value, "entries"); // Log each key-value pair in formData
    }

    handleCreatePost(formData);
    console.log(formData, "test gg");
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!createPostPending && isSuccess) {
    // router.push("/");
  }

  return (
    <>
      {createPostPending && <Loading />}
      <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12">
        <h1 className="text-2xl font-semibold">Create a Post</h1>
        <Divider className="mb-5 mt-3" />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <PCInput label="Title" name="title" />
              </div>
              <div className="min-w-fit flex-1">
                <PCTextarea label="Content" name="content" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <PCSelect
                  label="Category"
                  name="category"
                  options={categoryOption}
                />
              </div>
              <div className="min-w-fit flex-1">
                <label
                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
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
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex gap-5 my-5 flex-wrap">
                {imagePreviews.map((imageDataUrl) => (
                  <div
                    key={imageDataUrl}
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

            <div className="flex items-center gap-2 py-2">
              {/* <PCInput label="Premium" name="premium"/> */}
            </div>

            <Divider className="my-5" />
            <div className="flex justify-end">
              <Button size="lg" type="submit">
                Post
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
