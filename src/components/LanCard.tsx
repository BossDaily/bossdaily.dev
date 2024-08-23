"use client";

import { LanyardDiscordCard } from "discord-card-react";
import "discord-card-react/styles";
import React from "react";
import { useLanyard } from "react-use-lanyard";

const LanCard: React.FC = () => {
  const { loading, status } = useLanyard({
		userId: "274973338676494347",
		socket: true,
	});

  return (
    <LanyardDiscordCard
      // Your Discord user ID (used for Lanyard)
      userId="274973338676494347"
      // Optional: Domain that points at your self-hosted Lanyard instance
      // apiUrl="your.lanyard.domain"
      imageUrl={`https://cdn.discordapp.com/avatars/${status?.discord_user.id}/${status?.discord_user.avatar}.png?size=1024&format=webp&quality=lossless&width=0&height=256`}
      badges={[{name: "Nitro", iconUrl: "https://github.com/mezotv/discord-badges/raw/main/assets/discordnitro.svg"}]}
      primaryColor="#7B2CBF"
      accentColor="#C77DFF"
      bannerUrl="banner.svg"
      basicInfo={{
        displayname: `${status?.discord_user.username}`,
        username: `${status?.discord_user.global_name}`,
        // Pronouns are optional
        pronouns: "he/him",
      }}
      
    ></LanyardDiscordCard>
  );
};

export default LanCard;
