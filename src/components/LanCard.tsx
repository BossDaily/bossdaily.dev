"use client";

import { LanyardDiscordCard } from "discord-card-react";
import "discord-card-react/styles";
import React from "react";

const LanCard: React.FC = () => {
  return (
    <LanyardDiscordCard
      // Your Discord user ID (used for Lanyard)
      userId="274973338676494347"
      // Optional: Domain that points at your self-hosted Lanyard instance
      // apiUrl="your.lanyard.domain"
      imageUrl="https://cdn.discordapp.com/avatars/274973338676494347/00dcf84af54a0a58d2394b4054e0f7f5.png?size=1024&format=webp&quality=lossless&width=0&height=256"
      badges={[{name: "Nitro", iconUrl: "https://github.com/mezotv/discord-badges/raw/main/assets/discordnitro.svg"}]}
      primaryColor="#7B2CBF"
      accentColor="#C77DFF"
      bannerUrl="banner.svg"
      basicInfo={{
        displayname: "BossDaily",
        username: "bossdaily",
        // Pronouns are optional
        pronouns: "he/him",
      }}
      
    ></LanyardDiscordCard>
  );
};

export default LanCard;
