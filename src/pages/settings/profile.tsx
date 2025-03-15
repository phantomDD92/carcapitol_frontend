'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';

import { DeleteAccountDialog } from '@/components/custom/settings/delete-account-dialog';
import { LogoutDialog } from '@/components/custom/settings/logout-dialog';
import { PersonalInformationTab } from '@/sections/settings/personal-information-tab';
import { SecurityTab } from '@/sections/settings/security-tab';
import { ChangePasswordTab } from '@/sections/settings/change-password-tab';
import CCMainLayout from '@/layouts/main/MainLayout';
import DashboardLayout from '@/layouts/dashboard/Layout';

interface Session {
  id: string;
  device: string;
  type: 'mobile' | 'desktop';
  location: string;
  status: 'online' | 'offline';
  lastLogin: string;
  ipAddress: string;
}

const initialSessions: Session[] = [
  {
    id: '1',
    device: 'Samsung Galaxy S23 Android 10.15.2',
    type: 'mobile',
    location: 'Alaska, United States',
    status: 'online',
    lastLogin: '2024-09-15 10:15:30',
    ipAddress: '124.34.5.6.90',
  },
  {
    id: '2',
    device: 'Windows 10 Chrome 128.0.0.0',
    type: 'desktop',
    location: 'Alaska, United States',
    status: 'offline',
    lastLogin: '2024-09-15 21:30',
    ipAddress: '124.34.5.6.90',
  },
];

export default function ProfileSettings() {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);
  const [sessions, setSessions] = React.useState<Session[]>(initialSessions);
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(true);
  const [showSessionEndedDialog, setShowSessionEndedDialog] =
    React.useState(false);

  const handleFinishSession = (sessionId: string) => {
    setSessions(sessions.filter((session) => session.id !== sessionId));
    setShowSessionEndedDialog(true);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium">Personal info</h1>
          <p className="text-sm text-gray-500">
            Update your photo and personal details here
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-red-600 hover:bg-red-700">Save</Button>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full border-b rounded-none h-auto p-0 space-x-6">
          <TabsTrigger
            value="personal"
            className="rounded-none border-b-2 border-transparent px-0 pb-4 pt-2 font-normal data-[state=active]:border-red-600 data-[state=active]:text-red-600"
          >
            Personal Information
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="rounded-none border-b-2 border-transparent px-0 pb-4 pt-2 font-normal data-[state=active]:border-red-600 data-[state=active]:text-red-600"
          >
            Security
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="rounded-none border-b-2 border-transparent px-0 pb-4 pt-2 font-normal data-[state=active]:border-red-600 data-[state=active]:text-red-600"
          >
            Change Password
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6 pt-6">
          <PersonalInformationTab />
        </TabsContent>

        <TabsContent value="security" className="space-y-6 pt-6">
          <SecurityTab
            twoFactorEnabled={twoFactorEnabled}
            setTwoFactorEnabled={setTwoFactorEnabled}
            sessions={sessions}
            handleFinishSession={handleFinishSession}
          />
        </TabsContent>

        <TabsContent value="password" className="space-y-6 pt-6">
          <ChangePasswordTab />
        </TabsContent>
      </Tabs>

      <DeleteAccountDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />

      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
      />

      <Dialog
        open={showSessionEndedDialog}
        onOpenChange={setShowSessionEndedDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 rounded-full bg-green-50 p-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <DialogDescription className="text-base font-medium text-gray-900">
              The session is over
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

ProfileSettings.getLayout = (page: React.ReactElement) => (
  <CCMainLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </CCMainLayout>
);
