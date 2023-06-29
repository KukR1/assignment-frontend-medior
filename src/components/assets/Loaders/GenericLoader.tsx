import React from 'react';
import { SyncLoader } from 'react-spinners';

interface GenericLoaderProps {
  size: number;
  color: string;
}

export default function GenericLoader({ size, color }: GenericLoaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <SyncLoader size={size} color={color} />
    </div>
  );
}
