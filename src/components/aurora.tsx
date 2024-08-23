"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import "discord-card-react/styles";
import { motion } from "framer-motion";
import React, { useEffect } from "react";


const AuroraBG: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <AuroraBackground className="bg-slate-50"  >
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        
      </motion.div>
    </AuroraBackground>
  );
};

export default AuroraBG;
