'use client';

import * as React from 'react';
import { ChevronDown, Info, Upload, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface DocumentUploadProps {
  label: string;
  progress?: number;
  onFileSelect: (file: File) => void;
}

function DocumentUpload({
  label,
  progress,
  onFileSelect,
}: DocumentUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600">{label}</p>
      {progress !== undefined ? (
        <div className="space-y-2 rounded-lg bg-red-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-red-600">
              {label.split(' ')[0]}
            </span>
            {progress === 100 && (
              <span className="flex items-center gap-1 text-sm text-green-600">
                <Check className="h-4 w-4" />
                Complete
              </span>
            )}
          </div>
          <Progress value={progress} className="h-1 bg-red-100">
            <div
              className="h-full bg-red-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>
      ) : (
        <div
          className="flex items-center gap-2 rounded-lg border border-dashed border-gray-200 p-4"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Upload className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-500">
            Drag & drop files or{' '}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-red-600 hover:underline"
            >
              browse files
            </button>
          </span>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      )}
    </div>
  );
}

interface DocumentSectionProps {
  title: string;
  info?: string;
  documents: Array<{
    label: string;
    progress?: number;
  }>;
  onFileSelect: (documentType: string, file: File) => void;
}

function DocumentSection({
  title,
  info,
  documents,
  onFileSelect,
}: DocumentSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium">{title}</h3>
        {info && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{info}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="space-y-6">
        {documents.map((doc) => (
          <DocumentUpload
            key={doc.label}
            label={doc.label}
            progress={doc.progress}
            onFileSelect={(file) => onFileSelect(doc.label, file)}
          />
        ))}
      </div>
    </div>
  );
}

export function DocumentsTab() {
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  const handleFileSelect = (documentType: string, file: File) => {
    console.log(`Selected file for ${documentType}:`, file);
    // Handle file upload logic here
  };

  const mandatoryDocuments = [
    {
      label: 'Vehicle Passport (PTS)',
      progress: 100,
    },
    {
      label: 'Vehicle Registration Certificate (VRC)',
      progress: 75,
    },
    { label: 'Identity Document (Passport/ID)' },
    { label: 'Compulsory Motor Third Party Liability Insurance (MTPL)' },
  ];

  const additionalDocuments = [
    { label: 'Service history (service book)' },
    { label: 'Diagnostic card' },
    { label: 'Additional agreement or inspection reports' },
    {
      label:
        'Power of attorney (transaction is executed through a representative)',
    },
  ];

  const legalEntityDocuments = [
    {
      label:
        'Constituent documents of the company (certificate of registration of the company)',
    },
    { label: 'Power of attorney for a company representative' },
    { label: 'Certificate of registration with the tax authority (TIN)' },
  ];

  const specificDocuments = [
    { label: 'Certificate of vehicle deregistration (vehicle is sold abroad)' },
    { label: 'Document on termination of previous pledge/arrest' },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Mandatory Documents */}
      <div className="space-y-6">
        <DocumentSection
          title="Mandatory documents"
          info="Required documents for vehicle registration"
          documents={mandatoryDocuments}
          onFileSelect={handleFileSelect}
        />
      </div>

      {/* Additional Documents */}
      <div className="space-y-6">
        <DocumentSection
          title="Additional documents"
          info="Optional but recommended documents"
          documents={additionalDocuments}
          onFileSelect={handleFileSelect}
        />

        {/* Additional sections */}
        <div className="space-y-4">
          <Collapsible
            open={openSection === 'legal'}
            onOpenChange={() =>
              setOpenSection(openSection === 'legal' ? null : 'legal')
            }
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-left">
              <span className="text-sm font-medium">
                Additional documents for legal entities
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  openSection === 'legal' && 'rotate-180',
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <DocumentSection
                title=""
                documents={legalEntityDocuments}
                onFileSelect={handleFileSelect}
              />
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            open={openSection === 'specific'}
            onOpenChange={() =>
              setOpenSection(openSection === 'specific' ? null : 'specific')
            }
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-left">
              <span className="text-sm font-medium">Specific documents</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  openSection === 'specific' && 'rotate-180',
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <DocumentSection
                title=""
                documents={specificDocuments}
                onFileSelect={handleFileSelect}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}
