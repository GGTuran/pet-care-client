/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useUpdateProfile } from "@/hooks/user.hook"; // Your hook for updating profile
import PCInput from "../form/PCInput";
import Loading from "@/app/(commonLayout)/loading";

type UpdateProfileProps = {
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
    image: string;
  };
};

export default function UpdateProfile({ user }: UpdateProfileProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(user.image || "");

  const { mutate: handleUpdateProfile, isPending: updateProfilePending } =
    useUpdateProfile();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const methods = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    },
  });
  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    // Populate default values on mount
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("address", user.address);
  }, [user, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const updatedData: Record<string, any> = {};

    // Check if each field is updated, only include changed fields
    if (data.name !== user.name) updatedData.name = data.name;
    if (data.email !== user.email) updatedData.email = data.email;
    if (data.phone !== user.phone) updatedData.phone = data.phone;
    if (data.address !== user.address) updatedData.address = data.address;

    const formData = new FormData();
    formData.append("data", JSON.stringify(updatedData));

    // If an image is uploaded, append it to formData
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Submit the form data using mutation hook
    handleUpdateProfile(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Update Profile
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="max-w-screen-lg mx-auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center md:text-left">
                Update Profile
              </ModalHeader>
              <ModalBody>
                {updateProfilePending && <Loading />}

                <FormProvider {...methods}>
                  <form
                    onSubmit={handleSubmit((data) => {
                      onSubmit(data); // Call submit handler
                      onClose(); // Close modal after submission
                    })}
                  >
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <PCInput
                        label="Name"
                        name="name"
                        placeholder={user.name || "Enter your name"}
                        className="w-full"
                      />
                      <PCInput
                        label="Email"
                        name="email"
                        placeholder={user.email || "Enter your email"}
                        className="w-full"
                      />
                      <PCInput
                        label="Phone"
                        name="phone"
                        placeholder={user.phone || "Enter your phone number"}
                        className="w-full"
                      />
                      <PCInput
                        label="Address"
                        name="address"
                        placeholder={user.address || "Enter your address"}
                        className="w-full"
                      />
                    </div>

                    <label
                      className="mt-5 block w-full h-14 cursor-pointer flex items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                      htmlFor="image"
                    >
                      Upload new profile image
                    </label>
                    <input
                      className="hidden"
                      id="image"
                      type="file"
                      onChange={handleImageChange}
                    />

                    {imagePreview && (
                      <div className="flex justify-center my-5">
                        <img
                          alt="Preview"
                          className="h-32 w-32 object-cover rounded-full md:h-40 md:w-40 lg:h-48 lg:w-48"
                          src={imagePreview}
                        />
                      </div>
                    )}

                    <Divider className="my-5" />
                    <ModalFooter className="flex flex-col md:flex-row md:justify-between">
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={onClose}
                        className="w-full md:w-auto"
                      >
                        Close
                      </Button>
                      <Button
                        color="primary"
                        type="submit"
                        className="w-full md:w-auto mt-3 md:mt-0"
                      >
                        Save Changes
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
