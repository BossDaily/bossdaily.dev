import React from "react";
import WordPullUp from "./magicui/word-pull-up";

interface HeaderTextProps {
  children: React.ReactNode;
}

export const HeaderText: React.FC<HeaderTextProps> = ({ children }) => {
  return (
    <div className="flex h-full overflow-visible">
      <WordPullUp
        className="text-3xl sm:text-4xl h-full md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-neutral-50 to-neutral-400 bg-opacity-50 overflow-visible"
        words={`${children}`}
      /> 
    </div>

    /* <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center sm:text-left bg-clip-text text-transparent bg-linear-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
      {children}
    </h1> */
  );
};
