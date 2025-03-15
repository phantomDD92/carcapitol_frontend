'use client';

import * as React from 'react';
import { Play, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
interface VideoGuide {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  category: string;
}

const videoGuides: VideoGuide[] = [
  // Login Process
  {
    id: '1',
    title: 'Creating an Account',
    description: 'Learn how to create and set up your account',
    thumbnail: '/placeholder.svg?height=180&width=320',
    videoUrl: 'https://example.com/video1.mp4',
    duration: '2:30',
    category: 'Login Process',
  },
  {
    id: '2',
    title: 'Login Options',
    description: 'Different ways to access your account',
    thumbnail: '/placeholder.svg?height=180&width=320',
    videoUrl: 'https://example.com/video2.mp4',
    duration: '3:15',
    category: 'Login Process',
  },
  {
    id: '3',
    title: 'Mobile App Access',
    description: 'How to use the mobile application',
    thumbnail: '/placeholder.svg?height=180&width=320',
    videoUrl: 'https://example.com/video3.mp4',
    duration: '4:00',
    category: 'Login Process',
  },
  // Payment Procedure
  {
    id: '4',
    title: 'Payment Methods',
    description: 'Overview of available payment options',
    thumbnail: '/placeholder.svg?height=180&width=320',
    videoUrl: 'https://example.com/video4.mp4',
    duration: '5:30',
    category: 'Payment Procedure',
  },
  {
    id: '5',
    title: 'Processing Payments',
    description: 'Step-by-step payment guide',
    thumbnail: '/placeholder.svg?height=180&width=320',
    videoUrl: 'https://example.com/video5.mp4',
    duration: '4:45',
    category: 'Payment Procedure',
  },
  {
    id: '6',
    title: 'Refund Process',
    description: 'Understanding the refund policy',
    thumbnail: '/placeholder.svg?height=180&width=320',
    videoUrl: 'https://example.com/video6.mp4',
    duration: '3:20',
    category: 'Payment Procedure',
  },
  // Account Settings
  {
    id: '7',
    title: 'Profile Management',
    description: 'How to update your profile information',
    thumbnail: '/placeholder.svg?height=180&width=320',
    videoUrl: 'https://example.com/video7.mp4',
    duration: '3:45',
    category: 'Account Settings',
  },
  {
    id: '8',
    title: 'Security Settings',
    description: 'Securing your account',
    thumbnail: '/placeholder.svg?height=180&width=320',
    videoUrl: 'https://example.com/video8.mp4',
    duration: '4:15',
    category: 'Account Settings',
  },
];

export function VideoGuidesTab() {
  const [selectedVideo, setSelectedVideo] = React.useState<VideoGuide | null>(
    null,
  );

  // Group videos by category
  const videosByCategory = React.useMemo(() => {
    return videoGuides.reduce(
      (acc, video) => {
        if (!acc[video.category]) {
          acc[video.category] = [];
        }
        acc[video.category].push(video);
        return acc;
      },
      {} as Record<string, VideoGuide[]>,
    );
  }, []);

  return (
    <div className="py-6">
      {Object.entries(videosByCategory).map(([category, videos]) => (
        <div key={category} className="mb-8">
          <h2 className="mb-4 text-lg font-medium">{category}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((guide) => (
              <div
                key={guide.id}
                className="group relative overflow-hidden rounded-lg border bg-white cursor-pointer"
                onClick={() => setSelectedVideo(guide)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={guide.thumbnail}
                    alt={guide.title}
                    fill
                    className="w-100 h-100 transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="rounded-full bg-white/90 p-3">
                      <Play className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                    {guide.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 font-medium">{guide.title}</h3>
                  <p className="text-sm text-gray-500">{guide.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Dialog
        open={!!selectedVideo}
        onOpenChange={() => setSelectedVideo(null)}
      >
        <DialogContent className="sm:max-w-[800px] p-0">
          <DialogTitle className="sr-only">
            {selectedVideo ? selectedVideo.title : 'Video Guide'}
          </DialogTitle>
          <div className="relative">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="aspect-video w-full">
              {selectedVideo && (
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            {selectedVideo && (
              <div className="p-4">
                <h2 className="text-lg font-medium">{selectedVideo.title}</h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedVideo.description}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
