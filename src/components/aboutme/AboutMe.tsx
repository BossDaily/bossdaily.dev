"use client";

import { config } from "../../../config";
import { useLanyard } from "react-use-lanyard";
import { HeaderText } from "../HeaderText";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Badge } from "../ui/badge";
import ShinyButton from "../magicui/shiny-button";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import Globe from "./globe";
import { WakatimeData } from "./wakatimeInterface";
import NumberTicker from "../ui/number-ticker";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Octokit } from "@octokit/rest";
import Marquee from "../ui/marquee";
import LanguagesDialog from "./LanguagesDialog";
import DiscordCard from "./DiscordCard";

interface AboutMeProps {
  wakatimeData: WakatimeData | null;
}

const octokit = new Octokit();

export const AboutMe: React.FC<AboutMeProps> = ({ wakatimeData }) => {
  /* const { loading, status } = useLanyard({
    userId: config.discordId,
    socket: true,
  }); */

  /*  const [scope, animate] = useAnimate();

  useEffect(() => {
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
  const [stats, setStats] = useState({
    publicRepos: 0,
    followers: 0,
    totalStars: 0,
  });

  useEffect(() => {
    async function fetchGitHubStats() {
      const userResponse = await octokit.rest.users.getByUsername({
        username: "bossdaily",
      });

      const reposResponse = await octokit.rest.repos.listForUser({
        username: "bossdaily",
      });

      const totalStars = reposResponse.data.reduce(
        (acc, repo) => acc + (repo?.stargazers_count ?? 0),
        0
      );

      setStats({
        publicRepos: userResponse.data.public_repos,
        followers: userResponse.data.followers,
        totalStars,
      });
    }

    fetchGitHubStats();
  }, []);

  const totalHrs = wakatimeData?.data.total_seconds
    ? Math.round(wakatimeData.data.total_seconds / 3600)
    : 0;

  const allLanguages = config.languages.flatMap(
    (category) => category.languages
  );
  const halfPoint = Math.ceil(allLanguages.length / 2);
  const firstHalf = allLanguages.slice(0, halfPoint);
  const secondHalf = allLanguages.slice(halfPoint);

  return (
    <div
      className="z-20 h-full max-w-full items-center sm:max-w-5xl flex flex-col sm:items-center sm:justify-center relative align-middle mx-auto py-6 sm:py-24"
      id="about"
    >
      <HeaderText>About Me</HeaderText>
      <div className="grid h-full w-full gap-4 p-2 grid-cols-1 sm:grid-cols-12 sm:grid-rows-2 rounded-lg text-white">
        <div className="col-span-1 sm:col-span-3 sm:row-span-1 shadow-feature-card-dark bg-BlackRussian group rounded-lg flex items-center justify-center overflow-hidden relative min-h-[120px]">
          <p className="absolute top-2 right-4 z-10">Hours Programming</p>
          <p className="text-5xl sm:text-7xl">
            <NumberTicker
              className="text-white tracking-tighter"
              value={totalHrs}
            />{" "}
          </p>
        </div>
        <div className="col-span-1 sm:col-span-6 sm:row-span-1 shadow-feature-card-dark bg-BlackRussian group rounded-lg flex items-center justify-center overflow-hidden relative h-48">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p className="absolute top-2 right-4 z-10 hover:text-purple-600 hover:underline">
                  Based in Texas
                </p>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                sideOffset={16}
                className="border-none text-white bg-Windsor"
              >
                <p>
                  Time for me:{" "}
                  {new Date().toLocaleTimeString("en-US", {
                    timeZone: "America/Chicago",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}{" "}
                  (CST){" "}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="absolute inset-0  ">
            <Globe className="" />
          </div>
        </div>

        <div className="col-span-1 sm:col-span-3 sm:row-span-4 shadow-feature-card-dark bg-BlackRussian group rounded-lg flex items-center justify-center overflow-hidden p-2">
          <div className="relative w-full h-full flex flex-col items-center justify-start gap-1">
            <p className=" hover:text-purple-600 hover:underline">
              Discord
            </p>
            <DiscordCard />
          </div>
        </div>

        <div className="col-span-1 sm:col-span-6 sm:row-span-2 shadow-feature-card-dark bg-BlackRussian group rounded-lg flex items-center justify-center overflow-hidden p-4 relative">
          <LanguagesDialog
            trigger={
              <p className="absolute top-2 right-4 z-10 cursor-pointer hover:text-purple-600 hover:underline transition-colors">
                Stacks
              </p>
            }
          />

          <LanguagesDialog
            trigger={
              <div className="flex flex-col items-center justify-center gap-2 w-full overflow-visible">
                <div className="relative z-10">
                  <Marquee
                    pauseOnHover
                    className="[--duration:20s] overflow-visible"
                  >
                    {firstHalf.map((lang, i) => (
                      <TooltipProvider key={i}>
                        <Tooltip>
                          <TooltipTrigger>
                            <img
                              src={lang.img}
                              alt={lang.name}
                              className="w-8 h-8 sm:w-10 sm:h-10 mx-2"
                            />
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="border-none text-white bg-Windsor z-50"
                          >
                            <p className="">{lang.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </Marquee>
                </div>
                <div className="relative z-10">
                  <Marquee
                    reverse
                    pauseOnHover
                    className="[--duration:20s] overflow-visible"
                  >
                    {secondHalf.map((lang, i) => (
                      <TooltipProvider key={i}>
                        <Tooltip>
                          <TooltipTrigger>
                            <img
                              src={lang.img}
                              alt={lang.name}
                              className="w-8 h-8 sm:w-10 sm:h-10 mx-2"
                            />
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="border-none text-white bg-Windsor z-50"
                          >
                            <p>{lang.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </Marquee>
                </div>
              </div>
            }
          />
        </div>

        <div className="col-span-1 sm:col-span-3 sm:row-span-2 shadow-feature-card-dark bg-BlackRussian group rounded-lg flex items-center justify-center overflow-hidden relative min-h-[120px]">
          <p className="absolute top-2 right-4 z-10">Projects</p>
          <p className="text-5xl sm:text-7xl">
            <NumberTicker
              className="text-white tracking-tighter"
              value={stats.publicRepos}
            />
            +{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
