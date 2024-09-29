/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button, Card } from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
        <Card className="flex-1">
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Manage Content</h3>
            <p>Admins can publish or unpublish posts from here.</p>
            <div className="flex gap-2 mt-4">
              <Button>Publish Post</Button>
              <Button color="danger">Unpublish Post</Button>
            </div>
          </div>
        </Card>

        <Card className="flex-1">
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
            <p>Admins can manage users from here.</p>
          </div>
        </Card>

        <Card className="flex-1">
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Payment History</h3>
            <p>Admins can view the payment history here.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
