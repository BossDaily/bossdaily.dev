"use client";

import { HeaderText } from "./HeaderText";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ShinyButton from "./magicui/shiny-button";
import { motion } from "framer-motion";
import { AuroraBackground } from "./ui/aurora-background";

export const Contact: React.FC = () => {
  return (
    <div className="z-20 h-full max-w-full items-center sm:max-w-5xl gap-8 flex flex-col sm:items-center sm:justify-center relative p-4 align-middle mx-auto py-12 sm:py-24" id="contact">
      <HeaderText>Contact me</HeaderText>
      <motion.div
        className="flex justify-center align-middle items-center w-full"
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
        <Card className="h-64 w-full flex flex-row overflow-hidden bg-background shadow-feature-card dark:shadow-feature-card-dark group relative">
          <div className="w-1/3 relative">
            <AuroraBackground className="absolute inset-0 h-full w-full">
              <div></div>
            </AuroraBackground>
          </div>
          <CardHeader className="flex-1 text-right py-8 px-8 relative z-10 flex flex-col justify-center items-end">
            <CardTitle className="text-2xl sm:text-3xl text-foreground mb-2">
              Ready to create an experience?
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mb-4">
              Contact me to get started!
            </CardDescription>
            <div className="flex justify-end">
              <a href="mailto:contact@bossdaily.dev" title="Contact Me">
                <ShinyButton text="Get in Touch" />
              </a>
            </div>
          </CardHeader>
          <CardContent className="p-0"></CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Contact;
