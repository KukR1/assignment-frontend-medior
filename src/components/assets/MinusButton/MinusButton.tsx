import React from 'react';

interface MinusButtonProps {
  onClick: () => void;
}

export default function MinusButton({ onClick }: MinusButtonProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-minus"
    >
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
}
