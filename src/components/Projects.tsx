"use client";

import { config } from "../../config";
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
import ShinyButton from "./magicui/shiny-button";
import { motion } from "framer-motion";

export const Projects: React.FC = () => {
  return (
    <div className="z-20 h-full max-w-full items-center sm:max-w-5xl gap-8 flex flex-col sm:items-center sm:justify-center relative p-4 align-middle mx-auto py-12 sm:py-24">
      <HeaderText>Featured Projects</HeaderText>
      <motion.div
        className="flex md:flex-row flex-col justify-center md:justify-between align-middle items-center gap-10 w-full"
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
        {config.projects.map((project, index) => {
          if (project.featured === true) {
            return (
              <Card
                key={index}
                className="h-max w-[320px] sm:w-[400px] md:w-[480px] overflow-hidden bg-background shadow-feature-card dark:shadow-feature-card-dark group"
              >
                <div className="p-2 sm:p-4 overflow-hidden">
                  <Image
                    src={project.thumbnail}
                    alt="project image"
                    height={1280}
                    width={832}
                    className="rounded-xl w-full h-auto object-cover"
                  />
                </div>
                <CardHeader className="py-0 text-white">
                  <a
                    className="flex flex-row gap-2 hover:underline"
                    href={project.url}
                  >
                    <CardTitle className="text-foreground hover:underline">{project.name}</CardTitle> <SiGithub className="text-foreground" />{" "}
                  </a>
                  <CardDescription className="text-zinc-400">
                    {project.description}
                  </CardDescription>
                  <CardFooter className="p-0 pt-2 gap-2 overflow-hidden">
                    <motion.div
                      drag="x"
                      dragConstraints={{ left: -100, right: 0 }}
                      className="flex flex-row gap-2"
                    >
                      {project.tags.map((tag, index) => {
                        return (
                          <Badge key={index} className="bg-purple-heart  text-white w-full">
                            {tag}
                          </Badge>
                        );
                      })}
                    </motion.div>
                  </CardFooter>
                </CardHeader>

                <CardContent className="p-0"></CardContent>
                <CardFooter></CardFooter>
              </Card>
            );
          }
        })}
      </motion.div>
      <a title="View Projects" href="https://github.com/bossdaily">
        <ShinyButton text="View All Projects" className="dark" />
      </a>
    </div>
  );
};

export default Projects;
