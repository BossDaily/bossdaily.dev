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
import { useEffect } from "react";
import LanCard from "./LanCard";
import Globe from "./globe";
import WakaStat from "./wakastat";
import { WakatimeData } from "./wakatimeInterface";
import NumberTicker from "../ui/number-ticker";

interface AboutMeProps {
  wakatimeData: WakatimeData | null;
}
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
  const totalHrs = wakatimeData?.data.total_seconds ? Math.round(wakatimeData.data.total_seconds / 3600): 0

  const totalProjects = wakatimeData?.data.projects ? wakatimeData.data.projects.length : 0

  return (
    <div className="z-20 h-full max-w-full items-center sm:max-w-5xl flex flex-col sm:items-center sm:justify-center relative  align-middle mx-auto py-12 sm:py-24">
      <HeaderText>Featured Projects</HeaderText>
      <div className="grid h-full w-full gap-4 p-2 grid-cols-12 grid-rows-2 rounded-lg text-white">
        <div className="col-span-3 row-span-1 shadow-feature-card-dark bg-BlackRussian group rounded-lg flex items-center justify-center overflow-hidden">
            <p className="text-2xl">
            <NumberTicker className="text-white tracking-tighter" value={totalHrs} /> hours
            </p>
        </div>

        <div className="col-span-6 row-span-1 shadow-feature-card-dark bg-BlackRussian group rounded-lg flex items-center justify-center overflow-hidden relative h-48">
          <p className="absolute top-2 right-4 z-10">Broccoli</p>
          <div className="absolute inset-0">
            <Globe />
          </div>
        </div>

        <div className="col-span-3 row-span-4 shadow-feature-card-dark bg-BlackRussian group rounded-lg flex items-center justify-center overflow-hidden">
            <div className="relative w-full">
            <Image
              src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=bossdaily&theme=tokyonight"
              alt="Picture of the author"
              width={300}
              height={200}
              priority
              sizes="(min-width: 808px) 50vw, 100vw"
              className="object-cover"
            />
            </div>

            <div className="relative w-full">
            <Image
              src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=bossdaily&theme=tokyonight"
              alt="Picture of the author"
              width={300}
              height={200}
              priority
              sizes="(min-width: 808px) 50vw, 100vw"
              className="object-cover"
            />
            </div>
          {/* <LanCard /> */}
        </div>

        <div className="col-span-6 row-span-2 shadow-feature-card-dark bg-BlackRussian group rounded-lg flex items-center justify-center overflow-hidden">
          <p>Pork</p>
        </div>

        <div className="col-span-3 row-span-2 shadow-feature-card-dark bg-BlackRussian group rounded-lg flex items-center justify-center overflow-hidden">
          <p><NumberTicker className="text-white tracking-tighter  text-2xl" value={totalProjects} /> Projects</p>
        </div>
      </div>

      {/* <LanCard /> */}
    </div>
  );
};

export default AboutMe;
