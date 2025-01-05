"use client"

import { cn } from "@/lib/utils";
import React from "react";
import { useLanyard } from "react-use-lanyard";

const Footer: React.FC = () => {
  const { loading, status } = useLanyard({
    userId: "274973338676494347",
    socket: true,
  });

  const online =
    (status?.active_on_discord_desktop || status?.active_on_discord_web) &&
    status?.discord_status === "online";

  return (
    <div className="z-20 h-full w-full max-w-full items-center sm:max-w-5xl flex flex-col relative align-middle mx-auto py-6 sm:py-24">
      <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-between items-start w-full px-4 sm:px-[35px] py-6 sm:py-12 rounded-[20px] bg-Windsor/[0.1] border border-white/[0.01] backdrop-blur-[6px] gap-2">
          {online && (
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2 p-2.5">
              <div className="flex relative">
                <span className="flex w-4 h-4">
                  <span
                    className={cn(
                      "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                      "bg-green-400"
                    )}
                  />
                  <span
                    className={cn(
                      "relative inline-flex rounded-full h-4 w-4",
                      "bg-green-500"
                    )}
                  />
                </span>
              </div>
              <p className="flex-grow-0 flex-shrink-0 text-2xl font-bold text-left text-white">
                Online
              </p>
            </div>
          )}
          <div className="flex flex-col justify-start items-start flex-grow relative overflow-hidden gap-2 px-2.5 py-9">
            <a
              href="/"
              className="flex-grow-0 flex-shrink-0 text-xl text-left text-white hover:text-gray-300 hover:underline"
            >
              Home
            </a>
            <a
              href="/projects"
              className="flex-grow-0 flex-shrink-0 text-xl text-left text-white hover:text-gray-300 hover:underline"
            >
              Projects
            </a>
            <a
              href="https://github.com/bossdaily"
              className="flex-grow-0 flex-shrink-0 text-xl text-left text-white hover:text-gray-300 hover:underline"
            >
              Github
            </a>
            <a
              href="https://wakatime.com/bossdaily"
              className="flex-grow-0 flex-shrink-0 text-xl text-left text-white hover:text-gray-300 hover:underline"
            >
              WakaTime
            </a>
          </div>
          <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 p-2.5">
            <p className="flex-grow-0 flex-shrink-0 text-base text-left text-white">
              ©{new Date().getFullYear()} BossDaily
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
