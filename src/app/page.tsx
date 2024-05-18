import Image from "next/image";
import { Spotlight } from "@/components/ui/Spotlight";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

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

]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="h-[40rem] w-full flex md:items-center md:justify-center bg-BlackRussian antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          BossDaily <br /> <TypewriterEffectSmooth words={words} />
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Aasdfjkl;asjkfl;asdjl;
        </p>
      </div>
    </div>
    </main>
  );
}
