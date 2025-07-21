"use client";

import { Spotlight } from "./ui/Spotlight";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { config } from "../../config";
import { FlipWords } from "./ui/flip-words";
import { Avatar } from "./hexta-ui/Avatar";
import { useLanyard } from "react-use-lanyard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { statusColors, statusText } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useRef } from "react";

export const Hero: React.FC = () => {
  const { loading, status } = useLanyard({
    userId: config.discordId,
    socket: true,
  });
/*   const [scope, animate] = useAnimate();

  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    void animate(
      [
        [scope.current, { y: "0%" }, { duration: 0 }],
        [scope.current, { y: "-25%" }, { duration: 0.3, at: "+1.3" }],
        [scope.current, { y: "-50%" }, { duration: 0.3, at: "+1.3" }],
        [scope.current, { y: "-75%" }, { duration: 0.3, at: "+1.3" }],
      ],
      {
        repeat: Number.POSITIVE_INFINITY,
      }
    );
  }, [animate, scope]); */

  return (
    <div className="z-20  h-full max-w-full items-center sm:max-w-5xl gap-8 my-8 sm:my-16 flex flex-col sm:flex-row sm:items-center sm:justify-between relative overflow-visible p-4 align-middle mx-auto py-12 sm:py-24">
      <Spotlight
        className="-top-20 sm:-top-40 left-0 sm:left-60 sm:-top-20"
        fill="#C77DFF"
      />
      <motion.div
        className="mx-auto relative w-full pt-10 sm:pt-20 md:pt-0 gap-1 flex flex-col items-center sm:items-start"
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center sm:text-left bg-clip-text text-transparent bg-linear-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Hello, I am BossDaily <br />{" "}
          <FlipWords
            words={config.hero_words}
            className="text-white text-2xl sm:text-3xl"
          />
        </h1>
      </motion.div>
      <motion.div
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Avatar
                avatarUrl={`https://cdn.discordapp.com/avatars/${status?.discord_user.id}/${status?.discord_user.avatar}.png?size=1024&format=webp&quality=lossless&width=0&height=256`}
                size={120}
                className={cn(
                  "hover:ring-4",
                  `hover:ring-${statusColors(status)}`
                )}
              />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              sideOffset={16}
              className="border-none text-white bg-Windsor"
            >
              <p>{statusText(status)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    </div>
  );
};
