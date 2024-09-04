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
import { HeaderText } from "./HeaderText";

export const Projects: React.FC = () => {
  const { loading, status } = useLanyard({
    userId: config.discordId,
    socket: true,
  });
  return (
    <div className="z-20 center   h-full max-w-full items-center sm:max-w-5xl gap-8 my-8 sm:my-16 flex flex-col sm:flex-row sm:items-center sm:justify-between relative overflow-visible p-4 align-middle mx-auto py-12 sm:py-24">
      <HeaderText>Projects</HeaderText>
    </div>
  );
};

export default Projects;
