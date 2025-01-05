import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="z-20 h-full max-w-full items-center sm:max-w-5xl flex flex-col sm:items-center sm:justify-center relative  align-middle mx-auto py-12 sm:py-24">
      <div className="flex flex-col justify-center items-center self-stretch flex-grow ">
        <div className="flex flex-col justify-between items-start self-stretch flex-grow px-[35px] py-12 rounded-[14px] bg-white/[0.01] border border-white/[0.01] backdrop-blur-[21px]">
          <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-9 p-2.5">
            <svg
              width="75"
              height="75"
              viewBox="0 0 75 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0"
              preserveAspectRatio="none"
            >
              <circle cx="37.5" cy="37.5" r="37.5" fill="#3BA55D"></circle>
            </svg>
            <p className="flex-grow-0 flex-shrink-0 text-5xl font-bold text-left text-white">
              Online
            </p>
          </div>
          <div className="flex flex-col justify-start items-start flex-grow relative overflow-hidden gap-9 px-2.5 py-9">
            <p className="flex-grow-0 flex-shrink-0 text-5xl font-bold text-left text-white">
              Home
            </p>
            <p className="flex-grow-0 flex-shrink-0 text-5xl font-bold text-left text-white">
              Projects
            </p>
            <p className="flex-grow-0 flex-shrink-0 text-5xl font-bold text-left text-white">
              Github
            </p>
            <p className="flex-grow-0 flex-shrink-0 text-5xl font-bold text-left text-white">
              WakaTime
            </p>
          </div>
          <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 p-2.5">
            <p className="flex-grow-0 flex-shrink-0 text-5xl font-bold text-left text-white">
              ©2024 BossDaily
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
