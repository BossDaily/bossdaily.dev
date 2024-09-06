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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { SiGithub } from '@icons-pack/react-simple-icons';
import { Badge } from "./ui/badge";

export const Projects: React.FC = () => {
  const { loading, status } = useLanyard({
    userId: config.discordId,
    socket: true,
  });
  return (
    <div className="z-20 h-full max-w-full items-center sm:max-w-5xl gap-8 flex flex-col  sm:items-center sm:justify-center relative p-4 align-middle mx-auto py-12 sm:py-24">
      <HeaderText>Projects</HeaderText>
      <div className="flex md:flex-row flex-col justify-center md:justify-between align-middle items-center gap-10">
        <Card className="h-full w-4/6 overflow-hidden shadow-feature-card-dark bg-BlackRussian group">
          <div className="p-4 overflow-hidden">
            <Image
              src="/project-analog.png"
              alt="project image"
              height={1280}
              width={832}
              className="rounded-xl"
            />
          </div>
          <CardHeader className="py-0 text-white">
            <a className="flex flex-row gap-2 hover:underline" href="https://github.com/BossDaily/bossdaily.dev"><CardTitle>Analog Svelte</CardTitle> <SiGithub /> </a>
            <CardDescription className="text-zinc-400">
              A project that is analog in nature.
            </CardDescription>
            <CardFooter className="p-0 pt-2 gap-2 overflow-hidden">
              <Badge className="bg-Purple-Heart">React</Badge>
              <Badge className="bg-Purple-Heart">TypeScript</Badge>
              <Badge className="bg-Purple-Heart">SvelteKit</Badge>
              <Badge className="bg-Purple-Heart">Tailwind CSS</Badge>


            </CardFooter>
          </CardHeader>

          <CardContent className="p-0"></CardContent>
          <CardFooter></CardFooter>
        </Card>
        <Card className="h-full w-4/6 overflow-hidden shadow-feature-card-dark bg-BlackRussian group">
          <div className="p-4 overflow-hidden">
            <Image
              src="/project-embed.png"
              alt="project image"
              height={1280}
              width={832}
              className="rounded-xl"
            />
          </div>
          <CardHeader className="py-0 text-white">
            <a className="flex flex-row gap-2 hover:underline" href="https://github.com/BossDaily/bossdaily.dev"><CardTitle>Embed </CardTitle> <SiGithub /> </a>
            <CardDescription className="text-zinc-400">
              Generate a Discord Embed with a simple url
            </CardDescription>
            <CardFooter className="p-0 pt-2 gap-2 overflow-hidden">
              <Badge className="bg-Purple-Heart">React</Badge>
              <Badge className="bg-Purple-Heart">TypeScript</Badge>
              <Badge className="bg-Purple-Heart">Next.js</Badge>
              <Badge className="bg-Purple-Heart">Tailwind CSS</Badge>


            </CardFooter>
          </CardHeader>

          <CardContent className="p-0"></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Projects;
