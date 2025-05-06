// src/components/common/Button.jsx
import React from 'react';

export default function Button({ children, onClick, disabled = false, variant = 'default' }) {
  const base = 'font-medium py-2 px-4 rounded transition';
  const variants = {
    default: 'bg-default-btn hover:bg-default-border text-white',
    light: 'bg-light-btn hover:bg-filter-btn text-default-btn',
    success: 'bg-success-btn hover:bg-toast-success text-default-btn',
    reject: 'bg-reject-btn hover:bg-toast-fail text-default-btn',
    floating: 'bg-btn-floating hover:bg-default-border text-white rounded-full shadow-lg',
  };
  const className = [
    base,
    variants[variant] || variants.default,
    disabled ? 'opacity-50 cursor-not-allowed' : '',
  ].join(' ');

  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
