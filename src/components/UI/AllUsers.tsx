"use client";
import {
  useDeleteUser,
  useGetAllUsers,
  useUpdateToAdmin,
} from "@/hooks/user.hook";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Avatar,
} from "@nextui-org/react";
import { Pencil, Trash2 } from "lucide-react";

const statusColorMap = {
  admin: "success",
  user: "primary",
};

const AllUsers = () => {
  const { data, refetch } = useGetAllUsers();
  const { mutate: updateToAdmin } = useUpdateToAdmin();
  const { mutate: deleteUser } = useDeleteUser();
  const users = data?.data || [];

  const handlePromote = (userId: string) => {
    updateToAdmin(userId, {
      onSuccess: () => {
        // Refetch users to update UI
        refetch();
      },
      onError: (error) => {
        console.error("Error promoting user:", error);
      },
    });
  };

  const handleDelete = (userId: string) => {
    console.log(userId, "id");
    deleteUser(userId, {
      onSuccess: () => {
        // Refetch users to update UI
        refetch();
      },
      onError: (error) => {
        console.error("Error deleting user:", error);
      },
    });
  };

  const columns = [
    { uid: "name", name: "Name" },
    { uid: "email", name: "Email" },
    { uid: "phone", name: "Phone" },
    { uid: "address", name: "Address" },
    { uid: "role", name: "Role" },
    { uid: "actions", name: "Actions" },
  ];

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
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
        return <span className="text-sm text-gray-600">{user.email}</span>;
      case "phone":
        return <span className="text-sm text-gray-600">{user.phone}</span>;
      case "address":
        return <span className="text-sm text-gray-600">{user.address}</span>;
      case "role":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.role] || "default"}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            {user.role !== "admin" && (
              <Tooltip content="Promote to Admin">
                <span
                  className="text-lg text-gray-500 cursor-pointer hover:text-green-500 transition-colors"
                  onClick={() => handlePromote(user?._id)} // Call handlePromote with user id
                >
                  <Pencil />
                </span>
              </Tooltip>
            )}
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-gray-500 cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => handleDelete(user?._id)}
              >
                <Trash2 />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <span className="text-sm text-gray-600">{cellValue}</span>;
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl font-semibold mb-6">All Users</h1>
      <div className="overflow-x-auto">
        <div className="hidden md:block">
          <Table
            aria-label="Users table"
            className="w-full min-w-full table-auto"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  className="text-left text-gray-500 text-sm"
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={users}>
              {(item) => (
                <TableRow
                  key={item._id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  {(columnKey) => (
                    <TableCell className="py-3 px-5">
                      {renderCell(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile/Tablet Responsive Card Design */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex items-center gap-4 mb-2">
                <Avatar
                  src={user.image || "/default-avatar.png"}
                  alt={user.name}
                  className="w-20 h-20 text-large"
                />
                <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Address:</strong> {user.address}
                </p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <Chip
                  className="capitalize"
                  color={statusColorMap[user.role] || "default"}
                  size="sm"
                  variant="flat"
                >
                  {user.role}
                </Chip>
                <div className="flex items-center gap-2">
                  {user.role !== "admin" && (
                    <Tooltip content="Promote to Admin">
                      <span
                        className="text-lg text-gray-500 cursor-pointer hover:text-green-500 transition-colors"
                        onClick={() => handlePromote(user._id)}
                      >
                        <Pencil />
                      </span>
                    </Tooltip>
                  )}
                  <Tooltip color="danger" content="Delete user">
                    <span
                      className="text-lg text-gray-500 cursor-pointer hover:text-red-500 transition-colors"
                      onClick={() => handleDelete(user?._id)}
                    >
                      <Trash2 />
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
