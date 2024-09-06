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
import HyperText from "./magicui/hyper-text";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";

export const Projects: React.FC = () => {
  const { loading, status } = useLanyard({
    userId: config.discordId,
    socket: true,
  });
  return (
    <div className="z-20 h-full max-w-full items-center sm:max-w-5xl gap-8 flex flex-col  sm:items-center sm:justify-center relative p-4 align-middle mx-auto py-12 sm:py-24">
      <HeaderText>Projects</HeaderText>
      <div className="flex justify-between gap-10">
        <Card className="h-full w-4/6 overflow-hidden shadow-feature-card-dark bg-BlackRussian">
          <div className="p-4">
            <Image
              src="/project-analog.png"
              alt="project image"
              height={1280}
              width={832}
              className="rounded-xl"
            />
          </div>

          <CardContent className="py-5"></CardContent>
          <CardFooter>Hi</CardFooter>
        </Card>
        <Card className="h-full w-4/6 overflow-hidden">
          <CardContent>
            <Image
              src="/project-analog.png"
              alt="project image"
              height={1280}
              width={832}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Projects;
