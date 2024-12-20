import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#4A5568"/>
      <path d="M8 8H14V14H8V8Z" fill="#A0AEC0"/>
      <path d="M18 8H24V14H18V8Z" fill="#A0AEC0"/>
      <path d="M8 18H14V24H8V18Z" fill="#A0AEC0"/>
      <path d="M18 18H24V24H18V18Z" fill="#A0AEC0"/>
      <path d="M11 11H17V17H11V11Z" fill="#F7FAFC"/>
      <path d="M21 11H27V17H21V11Z" fill="#F7FAFC"/>
      <path d="M11 21H17V27H11V21Z" fill="#F7FAFC"/>
      <path d="M21 21H27V27H21V21Z" fill="#F7FAFC"/>
    </svg>
  );
};

export default Logo;

