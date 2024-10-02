"use client";
import { useGetPaidUsers } from "@/hooks/user.hook";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Avatar,
} from "@nextui-org/react";

const PaidUsers = () => {
  const { data } = useGetPaidUsers();
  const users = data?.data?.filter((user) => user.isPaid) || [];

  const columns = [
    { uid: "name", name: "Name" },
    { uid: "email", name: "Email" },
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
      case "actions":
        return (
          <Chip color="success" size="sm" variant="flat">
            Premium User
          </Chip>
        );
      default:
        return <span className="text-sm text-gray-600">{cellValue}</span>;
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl font-semibold mb-6">Paid Users</h1>
      <div className="overflow-x-auto">
        <div className="hidden md:block">
          <Table
            aria-label="Paid users table"
            className="w-full min-w-full table-auto"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  className="text-left text-gray-500 text-sm"
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
              <div className="flex justify-between items-center mt-2">
                <Chip color="success" size="sm" variant="flat">
                  Premium User
                </Chip>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaidUsers;
