import { Spotlight } from "./ui/Spotlight"
import { TypewriterEffectSmooth } from "./ui/typewriter-effect"

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
export const Hero: React.FC = () => {
  return (
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
  )}