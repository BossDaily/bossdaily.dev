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
import ShinyButton from "./magicui/shiny-button";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";

export const AboutMe: React.FC = () => {
  const { loading, status } = useLanyard({
    userId: config.discordId,
    socket: true,
  });
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

  return (
    <div className="z-20 h-full max-w-full items-center sm:max-w-5xl gap-8 flex flex-col  sm:items-center sm:justify-center relative p-4 align-middle mx-auto py-12 sm:py-24">
      <HeaderText>Featured Projects</HeaderText>
      <div className="flex h-full w-full items-center justify-center">
        <div className="grid h-full w-full gap-4 bg-gray-200 p-2 grid-cols-4 grid-rows-2 rounded-lg shadow-md">
          <div className="col-span-1 row-span-1 bg-pink-200 rounded-lg shadow-md flex items-center justify-center">
            <p className="text-8xl">Salmon</p>
          </div>

          <div className="col-span-2 row-span-1 bg-lime-200 rounded-lg shadow-md flex items-center justify-center">
            <p>Broccoli</p>
          </div>

          <div className="col-span-1 row-span-4 bg-yellow-200 rounded-lg shadow-md flex items-center justify-center">
            <p>Tamago</p>
          </div>

          <div className="col-span-2 row-span-2 bg-tan-200 rounded-lg shadow-md flex items-center justify-center">
            <p>Pork</p>
          </div>

          <div className="col-span-1 row-span-2 bg-green-200 rounded-lg shadow-md flex items-center justify-center">
            <p>Edamame</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
