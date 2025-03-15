import React from 'react';
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export function PersonalInformationTab() {
  const [profileImage, setProfileImage] = React.useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-600">Name</Label>
          <Input placeholder="Chris" />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-600">Surname</Label>
          <Input placeholder="Glasser" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-gray-600">Email address</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            ✉️
          </span>
          <Input className="pl-10" placeholder="k.r.mastrangelo@outlook.com" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-gray-600">Phone number</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            📞
          </span>
          <Input className="pl-10" placeholder="(401) 715-3344" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-gray-600">Your photo</Label>
        <p className="text-sm text-gray-500">
          This will be displayed on your profile.
        </p>
        <div className="mt-2 flex items-center gap-4">
          <Image
            src={profileImage || '/placeholder.svg'}
            alt="Profile"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex-1 rounded-lg border-2 border-dashed border-gray-200 p-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Drag & drop files or</span>
              <label
                htmlFor="profile-image"
                className="text-red-600 hover:underline cursor-pointer"
              >
                browse files
              </label>
              <input
                id="profile-image"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-600">Location</Label>
          <Select>
            <SelectTrigger>
              <span className="flex items-center gap-2">🇺🇸 United States</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">🇺🇸 United States</SelectItem>
              <SelectItem value="ca">🇨🇦 Canada</SelectItem>
              <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-gray-600">&nbsp;</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Alaska" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ak">Alaska</SelectItem>
              <SelectItem value="ca">California</SelectItem>
              <SelectItem value="ny">New York</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-gray-600">Language</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="English (US)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en-us">English (US)</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-gray-600">Notifications</h3>
          <p className="text-sm text-gray-500">
            You&#39;ll be always notified by email about any changes.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">App updates</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Bill Reminder</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Discount Available</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Payment Request</span>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
}
