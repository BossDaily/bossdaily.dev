"use client";
// @ts-ignore
import { motion, type AnimationProps } from "framer-motion";

import { cn } from "@/lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps;
interface ShinyButtonProps {
  text: string;
  className?: string;
}
const ShinyButton = ({
  text = "shiny-button",
  className,
}: ShinyButtonProps) => {
  return (
    <motion.button
      {...animationProps}
      className={cn(
        "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-all duration-300 ease-in-out bg-background text-foreground shadow-feature-card dark:shadow-feature-card-dark hover:shadow-lg cursor-pointer",
        className,
      )}
        >
      <span
        className="relative block h-full w-full text-sm uppercase tracking-wide text-muted-foreground font-medium"
      >
        {text}
      </span>
      <span
        className="absolute inset-0 z-10 block rounded-[inherit] p-px"
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
          background: `linear-gradient(-75deg, transparent calc(var(--x) + 20%), rgba(199, 125, 255, 0.8) calc(var(--x) + 25%), transparent calc(var(--x) + 100%))`,
        }}
      ></span>
    </motion.button>
  );
};

export default ShinyButton;
