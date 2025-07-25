"use client"

import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import { useLanyard } from "react-use-lanyard";
import { config } from "../../config";

type FooterLink = {
  url: string;
  name: string;
};

const Footer: React.FC = () => {
  const { loading, status } = useLanyard({
    userId: `${config.discordId}`,
    socket: true,
  });

  const online =
    (status?.active_on_discord_desktop || status?.active_on_discord_web) &&
    status?.discord_status === "online";

  return (
    <div className="z-20 w-full max-w-full px-4 sm:px-0 py-6 sm:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col justify-between w-full p-4 sm:p-8 rounded-[20px] bg-card/80 backdrop-blur-[6px] gap-4 shadow-lg">
          {online && (
            <div className="flex items-center gap-2 p-2">
              <div className="relative">
                <span className="flex w-3 h-3 sm:w-4 sm:h-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-green-400" />
                  <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-green-500" />
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-foreground">
                Online
              </p>
            </div>
          )}
          
          <div className="flex flex-col gap-4 px-2 py-4">
            {config.footer.links.map((link: FooterLink, index: number) => {
              const isExternal = link.url.startsWith('http');
              return (
                <Link
                  key={index}
                  href={link.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="text-lg sm:text-xl text-foreground hover:text-primary hover:underline transition-colors"
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col justify-start items-start grow-0 shrink-0 relative overflow-hidden gap-2.5 p-2.5">
            <p className="grow-0 shrink-0 text-base text-left text-foreground">
              ©{new Date().getFullYear()} {config.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
