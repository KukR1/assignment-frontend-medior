import React from 'react';

interface EditButtonProps {
  onEdit: () => void;
}

export default function EditButton({ onEdit }: EditButtonProps) {
  return (
    <button
      type="button"
      onClick={onEdit}
      style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fcc705"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-pencil"
      >
        <line x1="18" x2="22" y1="2" y2="6" />
        <path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z" />
      </svg>
    </button>
  );
}
