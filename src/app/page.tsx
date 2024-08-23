import Image from "next/image";
import { Spotlight } from "@/components/ui/Spotlight";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Navbar } from "@/components/hexta-ui/Navbar";
import { Background } from "@/components/background";
import { Hero } from "@/components/Hero";

const words = [
  {
    text: "Web Developer,",
  },
  {
    text: " Frontend Developer,",
  },
  {
    text: " Backend Developer,",
  },
  {
    text: " Fullstack Developer,",
  },
];

export default function Home() {
  return (
    <>
      <Background />

      <Navbar />

      <div></div>

      <Hero />
    </>
  );
}
