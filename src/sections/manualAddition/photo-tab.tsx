import React from 'react';
import { Info } from 'lucide-react';
import Image from 'next/image';
import { FileUpload } from '@/components/custom/file-upload';

export function PhotoTab() {
  const [mainPhoto, setMainPhoto] = React.useState<string | null>(null);
  const [exteriorPhotos, setExteriorPhotos] = React.useState<string[]>([]);
  const [interiorPhotos, setInteriorPhotos] = React.useState<string[]>([]);
  const [additionalPhotos, setAdditionalPhotos] = React.useState<string[]>([]);

  return (
    <div className="space-y-8">
      {/* Main Photo Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Main photo</h2>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">
          Take a head photo. Look, when you look at it, you will come first and
          become the lining of your proposition. Make such photos taken from the
          front, a little from the back and from the lower points
        </p>
        <FileUpload
          value={mainPhoto}
          onChange={setMainPhoto}
          className="max-w-xl"
        />
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">
            Examples of photos
          </p>
          <p className="text-sm text-gray-500">You can make similar photos</p>
          <div className="flex gap-4">
            <div className="relative aspect-[4/3] w-32 overflow-hidden rounded-lg border bg-gray-100">
              <Image
                src="/placeholder.svg"
                alt="Example photo"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Exterior Photos Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Exterior</h2>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">
          Take a head photo. Look, when you look at it, you will come first and
          become the lining of your proposition. Make such photos taken from the
          front, a little from the back and from the lower points
        </p>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <FileUpload
              key={i}
              value={exteriorPhotos[i]}
              onChange={(url) => {
                const newPhotos = [...exteriorPhotos];
                newPhotos[i] = url;
                setExteriorPhotos(newPhotos);
              }}
              className="aspect-[4/3]"
            />
          ))}
        </div>
      </div>

      {/* Interior Photos Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Interior</h2>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">
          Take photos of the front and rear seats and anything else you think is
          important - armrests, glove boxes, sunroof, etc.
        </p>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <FileUpload
              key={i}
              value={interiorPhotos[i]}
              onChange={(url) => {
                const newPhotos = [...interiorPhotos];
                newPhotos[i] = url;
                setInteriorPhotos(newPhotos);
              }}
              className="aspect-[4/3]"
            />
          ))}
        </div>
      </div>

      {/* Additional Photos Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Additionally</h2>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">
          To tell everything through a photo, you can also take several pictures
          of the service book, instructions, alarm key fob
        </p>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <FileUpload
              key={i}
              value={additionalPhotos[i]}
              onChange={(url) => {
                const newPhotos = [...additionalPhotos];
                newPhotos[i] = url;
                setAdditionalPhotos(newPhotos);
              }}
              className="aspect-[4/3]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
