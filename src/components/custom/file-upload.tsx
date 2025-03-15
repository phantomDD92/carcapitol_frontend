'use client';

import * as React from 'react';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string | null;
  onChange?: (value: string) => void;
  onBrowseFiles?: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  onBrowseFiles,
  className,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onChange) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onChange(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && onChange) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onChange(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleBrowseClick = () => {
    if (onBrowseFiles) {
      onBrowseFiles();
    } else {
      inputRef.current?.click();
    }
  };

  if (value) {
    return (
      <div
        className={cn(
          'relative aspect-[4/3] overflow-hidden rounded-lg border bg-gray-100',
          className,
        )}
      >
        <Image src={value} alt="Uploaded file" fill className="object-cover" />
        <div className="absolute right-3 top-3 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white"
            onClick={() => onChange?.('')}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-6 transition-colors hover:border-red-200',
        className,
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <Upload className="h-8 w-8 text-gray-400" />
      <div className="mt-4 flex items-center gap-1 text-sm">
        <button
          type="button"
          onClick={handleBrowseClick}
          className="text-red-600 hover:underline"
        >
          browse files
        </button>
        <span className="text-gray-600">or drag & drop</span>
      </div>
    </div>
  );
};
