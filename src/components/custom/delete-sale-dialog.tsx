'use client';

import * as React from 'react';
import { AlertCircle } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteSaleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (confirmed: boolean) => void;
}

export function DeleteSaleDialog({
  open,
  onOpenChange,
  onConfirm,
}: DeleteSaleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-red-100 p-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle>Are you sure you want to delete this?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the
                application and remove it from our servers.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button variant="outline" onClick={() => onConfirm(false)}>
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={() => onConfirm(true)}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
