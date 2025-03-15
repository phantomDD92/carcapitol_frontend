'use client';

import * as React from 'react';
import { useEffect } from 'react';

export interface BackDropProps {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}
export const BackDrop: React.FC<BackDropProps> = ({
  className,
  onClick,
  children,
}) => {
  useEffect(() => {
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [onClick]);

  return (
    <div className={className} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};
