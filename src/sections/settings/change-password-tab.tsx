import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function ChangePasswordTab() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-600">Current password</Label>
          <div className="relative">
            <Input type="password" placeholder="Enter current password" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-600">New password</Label>
          <div className="relative">
            <Input type="password" placeholder="Enter new password" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-600">Confirm new password</Label>
          <div className="relative">
            <Input type="password" placeholder="Confirm new password" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4 space-y-3">
          <p className="text-sm font-medium text-gray-600">
            Password must contain:
          </p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              Minimum 8 characters
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              Use at least 1 capital letter
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              Use at least 1 number
            </li>
          </ul>
        </div>

        <div className="flex items-start gap-2 pt-2">
          <Checkbox id="terminate" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terminate"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Terminate active sessions
            </label>
            <p className="text-sm text-gray-500">
              You&#39;ll be logged out on all connected devices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
