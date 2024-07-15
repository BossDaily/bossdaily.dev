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
];

export default function Home() {
  return (
    <>
      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        <div className="flex min-h-screen flex-col items-center justify-between">
          <div className="absolute inset-0 z-[-1] h-full w-full bg-BlackRussian bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:12rem_12rem] [mask-image:radial-gradient(ellipse_75%_70%_at_70%_0%,#000_70%,transparent_100%)]" />
        </div>
      </div>

      <div></div>

      <div className="z-20 h-[40rem] w-full flex md:items-center md:justify-center  relative overflow-visible">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#C77DFF"
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
    </>
  );
}
