/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card } from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
}

export const UserLayout = ({ children }: Props) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="flex-1">
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Followed Users</h3>
            <p>List of followed users will appear here.</p>
          </div>
        </Card>

        <Card className="flex-1">
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Followers</h3>
            <p>List of your followers will appear here.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
