import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface Session {
  id: string;
  device: string;
  type: 'mobile' | 'desktop';
  location: string;
  status: 'online' | 'offline';
  lastLogin: string;
  ipAddress: string;
}

interface SecurityTabProps {
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (enabled: boolean) => void;
  sessions: Session[];
  handleFinishSession: (sessionId: string) => void;
}

export function SecurityTab({
  twoFactorEnabled,
  setTwoFactorEnabled,
  sessions,
  handleFinishSession,
}: SecurityTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Two-factor authentication</h3>
          <p className="text-sm text-gray-500">
            Set up an additional security level for access to cloud records
          </p>
        </div>
        <Switch
          checked={twoFactorEnabled}
          onCheckedChange={setTwoFactorEnabled}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Active sessions</h3>
          <p className="text-sm text-gray-500">
            Your account is now visible on these devices
          </p>
        </div>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-start gap-4 rounded-lg bg-gray-50 p-4"
            >
              <div className="mt-1">
                {session.type === 'mobile' ? (
                  <Smartphone className="h-5 w-5 text-gray-400" />
                ) : (
                  <Monitor className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{session.device}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFinishSession(session.id)}
                    className="text-sm font-normal hover:bg-white"
                  >
                    Finish
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  {session.location},{' '}
                  {session.status === 'online' ? (
                    <span className="text-green-600">Online</span>
                  ) : (
                    'Offline'
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Last login: {session.lastLogin}
                </div>
                <div className="text-sm text-gray-500">
                  IP address: {session.ipAddress}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
