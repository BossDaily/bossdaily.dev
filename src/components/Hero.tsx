import { Spotlight } from "./ui/Spotlight";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { config } from "../../config";
import { FlipWords } from "./ui/flip-words";
import { Avatar } from "./hexta-ui/Avatar";

export const Hero: React.FC = () => {
  return (
    <div className="z-20 h-full max-w-5xl my-16 flex sm:items-center sm:justify-between  relative overflow-visible p-4 align-middle mx-auto mb-16 py-24 ">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#C77DFF"
      />
      <div className="   mx-auto relative z-10  w-full pt-20 md:pt-0 gap-1">
        <h1 className="text-4xl md:text-6xl font-bold text-left bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Hello, I am BossDaily <br />{" "}
          <FlipWords words={config.hero_words} className="text-white text-3xl" />
        </h1>
      </div>
      <Avatar avatarUrl="https://cdn.discordapp.com/avatars/274973338676494347/00dcf84af54a0a58d2394b4054e0f7f5.png?size=1024&format=webp&quality=lossless&width=0&height=256" size={240} />
    </div>
  );
};