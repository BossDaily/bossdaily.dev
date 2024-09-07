"use client";

import { config } from "../../config";
import { useLanyard } from "react-use-lanyard";
import { HeaderText } from "./HeaderText";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Badge } from "./ui/badge";

export const Projects: React.FC = () => {
  const { loading, status } = useLanyard({
    userId: config.discordId,
    socket: true,
  });
  return (
    <div className="z-20 h-full max-w-full items-center sm:max-w-5xl gap-8 flex flex-col  sm:items-center sm:justify-center relative p-4 align-middle mx-auto py-12 sm:py-24">
      <HeaderText>Featured Projects</HeaderText>
      <div className="flex md:flex-row flex-col justify-center md:justify-between align-middle items-center gap-10">
        {config.projects.map((project, index) => {
          if (project.featured === true) {
            return (
              <Card
                key={index}
                className="h-max w-7/12 md:w-4/6 overflow-hidden shadow-feature-card-dark bg-BlackRussian group"
              >
                <div className="p-4 overflow-hidden">
                  <Image
                    src={project.thumbnail}
                    alt="project image"
                    height={1280}
                    width={832}
                    className="rounded-xl"
                  />
                </div>
                <CardHeader className="py-0 text-white">
                  <a
                    className="flex flex-row gap-2 hover:underline"
                    href={project.url}
                  >
                    <CardTitle>{project.name}</CardTitle> <SiGithub />{" "}
                  </a>
                  <CardDescription className="text-zinc-400">
                    {project.description}
                  </CardDescription>
                  <CardFooter className="p-0 pt-2 gap-2 overflow-x-scroll">
                    {project.tags.map((tag, index) => {
                      return (
                        <Badge key={index} className="bg-Purple-Heart">
                          {tag}
                        </Badge>
                      );
                    })}
                  </CardFooter>
                </CardHeader>

                <CardContent className="p-0"></CardContent>
                <CardFooter></CardFooter>
              </Card>
            );
          }
        })}
      
      </div>
    </div>
  );
};

export default Projects;
