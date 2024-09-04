import React from 'react';

interface HeaderTextProps {
  children: React.ReactNode;
}

export const HeaderText: React.FC<HeaderTextProps> = ({ children }) => {
  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center sm:text-left bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
      {children}
    </h1>
  );
};