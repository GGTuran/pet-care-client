import { useGetFollowers } from "@/hooks/user.hook";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";

const UserFollowersModal = () => {
  const { data: userData } = useGetFollowers();
  const userFollowers = userData?.data[0]?.followers || [];

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Define the columns with proper keys
  const columns = [
    { uid: "name", name: "Name" },
    { uid: "email", name: "Email" },
  ];

  const renderCell = (user, columnKey) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: user.image || "/default-avatar.png",
            }}
            description={user.email}
            name={user.name}
          />
        );
      case "email":
        return <span>{user.email}</span>;
      default:
        return null;
    }
  };

  return (
    <>
      <Button onPress={onOpen}>Followers</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Followers</ModalHeader>
              <ModalBody>
                {userFollowers.length > 0 ? (
                  <Table aria-label="Followers Table">
                    <TableHeader columns={columns}>
                      {(column) => (
                        <TableColumn key={column.uid}>
                          {column.name}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody items={userFollowers}>
                      {(item) => (
                        <TableRow key={item?._id}>
                          {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                          )}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-gray-500">
                    No followers found.
                  </p>
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
};

export default UserFollowersModal;
