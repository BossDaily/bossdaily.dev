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

export const Projects: React.FC = () => {
  const { loading, status } = useLanyard({
    userId: config.discordId,
    socket: true,
  });
  return (
    <div>Projects</div>
  )}

  export default Projects;