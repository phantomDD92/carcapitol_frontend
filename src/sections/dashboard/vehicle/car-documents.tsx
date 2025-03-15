import { FileText } from 'lucide-react';

const documents = [
  {
    name: 'vehicle_passport_PTS.pdf',
    size: '2mb',
  },
  {
    name: 'vehicle_registration_certificate_VPC.pdf',
    size: '2mb',
  },
];

export function CarDocuments() {
  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div
          key={doc.name}
          className="flex items-center gap-3 rounded-lg border p-3 hover:bg-gray-50"
        >
          <FileText className="h-5 w-5 text-gray-400" />
          <div className="flex-1">
            <p className="text-sm font-medium">{doc.name}</p>
            <p className="text-sm text-gray-500">{doc.size}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
