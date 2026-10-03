import React from 'react';

interface FoodLoopLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const FoodLoopLogo: React.FC<FoodLoopLogoProps> = ({
  className = '',
  size = 56,
  showText = true,
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/foodloop-logo.svg"
        alt="Food Loop - Donor to Consumer"
        className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
