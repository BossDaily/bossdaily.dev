/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CSSProperties } from "react";
import { LanyardData } from "react-use-lanyard";

// Define the Lanyard data types
export namespace LanyardTypes {
  export interface Root {
    data: {
      discord_user: {
        id: string;
        username: string;
        discriminator: string;
        avatar: string | null;
        global_name?: string;
        public_flags?: number;
        avatar_decoration_data?: {
          asset: string;
        };
        clan?: {
          tag: string;
          badge: string;
          identity_guild_id: string;
        };
      };
      discord_status: "online" | "idle" | "dnd" | "offline";
      activities: Array<{
        type: number;
        application_id?: string;
        name: string;
        state?: string;
        details?: string;
        timestamps?: {
          start?: number;
          end?: number;
        };
        assets?: {
          large_image?: string;
          large_text?: string;
          small_image?: string;
          small_text?: string;
        };
        party?: {
          id?: string;
          size?: [number, number];
        };
        emoji?: {
          id?: string;
          name: string;
          animated?: boolean;
        };
      }>;
      listening_to_spotify: boolean;
      spotify?: {
        album_art_url: string;
        song: string;
        artist: string;
        album: string;
        track_id: string;
      };
    };
  }
}

// Props type for the LanyardCard component
interface LanyardCardProps {
  data: LanyardData | undefined;
  hideStatus?: boolean;
  hideTimestamp?: boolean;
  hideBadges?: boolean;
  hideProfile?: boolean;
  hideActivity?: "true" | "false" | "whenNotUsed";
  hideSpotify?: boolean;
  hideClan?: boolean;
  hideDecoration?: boolean;
  ignoreAppId?: string | string[];
  hideDiscrim?: boolean;
  showDisplayName?: boolean;
  animated?: "true" | "false";
  theme?: "dark" | "light";
  bg?: string;
  clanbg?: string;
  idleMessage?: string;
  borderRadius?: string;
  animatedDecoration?: "true" | "false";
}

// Badge mapping - You'll need to replace with actual badge images
const Badges: Record<string, string> = {
  Nitro: "YOUR_NITRO_IMAGE_BASE64",
  Staff: "YOUR_STAFF_IMAGE_BASE64",
  Partner: "YOUR_PARTNER_IMAGE_BASE64",
  // Add other badge types here
};

// Helper functions
const parseBool = (value?: boolean | string): boolean => {
  if (typeof value === "boolean") return value;
  return value === "true";
};

const parseAppId = (value?: string | string[]): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.split(",");
};

const getFlags = (flags?: number): string[] => {
  // Implement logic to convert flags number to array of badge names
  // This is a simplified placeholder
  const result: string[] = [];
  // Add logic based on Discord's flag bits
  return result;
};

const elapsedTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  } else {
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  }
};

const LanyardCard: React.FC<LanyardCardProps> = ({
  data,
  hideStatus = false,
  hideTimestamp = false,
  hideBadges = false,
  hideProfile = false,
  hideActivity = "false",
  hideSpotify = false,
  hideClan = false,
  hideDecoration = false,
  ignoreAppId = [],
  hideDiscrim = false,
  showDisplayName = false,
  animated = "true",
  theme = "dark",
  bg,
  clanbg,
  idleMessage = "I'm not currently doing anything!",
  borderRadius = "10px",
  animatedDecoration = "true",
}) => {
  // Images state
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // Process Discord data
  const {
    discord_user,
    discord_status,
    activities,
    listening_to_spotify,
    spotify,
  } = data || {
    discord_user: {},
    discord_status: "offline",
    activities: [],
    listening_to_spotify: false,
  };

  //console.log(activities)

  // Prepare the activities to display - filter out ignored app IDs
  const parsedIgnoreAppId = parseAppId(ignoreAppId);
  const displayActivities = useMemo(() => {
    return activities
      .filter((activity) => activity.type === 0)
      .filter(
        (activity) => !parsedIgnoreAppId.includes(activity.application_id || "")
      )
      .slice(0, 2);
  }, [activities, parsedIgnoreAppId]);
  
  const activity = displayActivities[0];
  // Avatar and status logic
  let avatarBorderColor = "#747F8D";
  let avatarExtension = "webp";
  let statusExtension = "webp";

  if (activities[0]?.emoji?.animated) statusExtension = "gif";
  if (discord_user.avatar && discord_user.avatar.startsWith("a_"))
    avatarExtension = "gif";
  if (animated === "false") avatarExtension = "webp";

  // Set avatar border color based on status
  switch (discord_status) {
    case "online":
      avatarBorderColor = "#43B581";
      break;
    case "idle":
      avatarBorderColor = "#FAA61A";
      break;
    case "dnd":
      avatarBorderColor = "#F04747";
      break;
    case "offline":
      avatarBorderColor = "#747F8D";
      break;
  }

  // Set background color
  const backgroundColor = bg || (theme === "light" ? "eee" : "1a1c1f");
  const clanBackgroundColor =
    clanbg || (theme === "light" ? "#e0dede" : "#111214");

  // Calculate heights
  const svgHeight = (): string => {
    if (hideProfile) return "130";
    if (hideActivity === "true") return "91";
    if (hideActivity === "whenNotUsed" && !activity && !listening_to_spotify)
      return "91";
    if (hideSpotify && listening_to_spotify) return "210";
    return "210";
  };

  const divHeight = (): string => {
    if (hideProfile) return "120";
    if (hideActivity === "true") return "81";
    if (hideActivity === "whenNotUsed" && !activity && !listening_to_spotify)
      return "81";
    if (hideSpotify && listening_to_spotify) return "200";
    return "200";
  };

  // Load images
  useEffect(() => {
    const loadImages = async () => {
      try {
        const newImages: Record<string, string> = {};

        // Load avatar
        if (discord_user.avatar) {
          const avatarUrl = `https://cdn.discordapp.com/avatars/${
            discord_user.id
          }/${discord_user.avatar}.${avatarExtension}?size=${
            avatarExtension === "gif" ? "64" : "256"
          }`;
          newImages.avatar = avatarUrl;
        } else {
          const discriminatorNum =
            discord_user.discriminator === "0"
              ? // @ts-ignore
                Number(BigInt(discord_user.id) >> BigInt(22)) % 6
              : Number(discord_user.discriminator) % 5;
          newImages.avatar = `https://cdn.discordapp.com/embed/avatars/${discriminatorNum}.png`;
        }

        // Load clan badge
        // @ts-ignore
        if (discord_user.clan && !hideClan) {
          // @ts-ignore
          newImages.clanBadge = `https://cdn.discordapp.com/clan-badges/${discord_user.clan.identity_guild_id}/${discord_user.clan.badge}.png?size=16`;
        }

        // Load avatar decoration
        // @ts-ignore
        if (discord_user.avatar_decoration_data && !hideDecoration) {
          // @ts-ignore
          newImages.avatarDecoration = `https://cdn.discordapp.com/avatar-decoration-presets/${discord_user.avatar_decoration_data.asset}.png?size=64&passthrough=${animatedDecoration}`;
        }

        // Load activity assets for all display activities
        for (let i = 0; i < displayActivities.length; i++) {
          const activity = displayActivities[i];

          if (activity?.assets?.large_image) {
            newImages[`largeImage_${i}`] =
              activity.assets.large_image.startsWith("mp:external/")
                ? `https://media.discordapp.net/external/${activity.assets.large_image.replace(
                    "mp:external/",
                    ""
                  )}`
                : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.webp`;
          }

          if (activity?.assets?.small_image) {
            newImages[`smallImage_${i}`] =
              activity.assets.small_image.startsWith("mp:external/")
                ? `https://media.discordapp.net/external/${activity.assets.small_image.replace(
                    "mp:external/",
                    ""
                  )}`
                : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.webp`;
          }
        }

        // Load Spotify album art
        if (listening_to_spotify && spotify?.album_art_url && !hideSpotify) {
          newImages.spotifyAlbum = spotify.album_art_url;
        }

        // Load status emoji if present
        const userStatus = activities.find((a) => a.type === 4);
        if (userStatus?.emoji?.id) {
          newImages.statusEmoji = `https://cdn.discordapp.com/emojis/${userStatus.emoji.id}.${statusExtension}`;
        }

        setImages(newImages);
        setLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setLoading(false);
      }
    };

    loadImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    discord_user.id,
    discord_user.avatar,
    discord_user.avatar_decoration_data,
    discord_user.clan,
    hideDecoration,
    hideClan,
    hideSpotify,
    avatarExtension,
    statusExtension,
    animatedDecoration,
    listening_to_spotify,
    spotify?.album_art_url,
    JSON.stringify(displayActivities), // Stringify to avoid deep comparison issues
    JSON.stringify(activities.find((a) => a.type === 4)), // User status
  ]);

  if (loading) {
    return <div>Loading Lanyard data...</div>;
  }

  // Get user status (custom status)
  const userStatus = activities.find((a) => a.type === 4);

  // Get flags/badges
  const flags = getFlags(discord_user.public_flags || 0);
  if (discord_user.avatar && discord_user.avatar.includes("a_")) {
    flags.push("Nitro");
  }

  return (
    <div className="w-full h-full flex flex-col relative font-sans overflow-y-auto">
      <style jsx>{`
        .hover-opacity {
          transition: opacity 0.2s ease;
        }
        .hover-opacity:hover {
          opacity: 0.25;
        }
        .activities-container::-webkit-scrollbar {
          width: 4px;
        }
        .activities-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .activities-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .activities-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>

      <div
        className={`w-full h-full flex flex-col p-1.5 rounded-lg ${
          theme === "dark" ? "text-white" : "text-black"
        } text-base`}
      >
        {!hideProfile && (
          <div
            className={`w-full flex flex-row pb-1.5 ${
              hideActivity !== "false" && !activity && !listening_to_spotify
                ? ""
                : `border-b ${
                    theme === "dark" ? "border-white/10" : "border-black/10"
                  }`
            }`}
          >
            <div className="flex relative h-20 w-20 shrink-0">
              <img
                src={images.avatar}
                alt="User Avatar"
                className="rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px]"
                style={{
                  border: `3px solid ${avatarBorderColor}`,
                }}
              />

              {!hideDecoration &&
                (discord_user as any).avatar_decoration_data && (
                  <>
                    <img
                      src={images.avatarDecoration}
                      alt="Avatar Decoration"
                      className="hover-opacity block w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />

                    <span
                      className="absolute bottom-3.5 right-3.5 h-3.5 w-3.5 rounded-full"
                      style={{
                        backgroundColor: avatarBorderColor,
                        border: `3px solid #${backgroundColor}`,
                      }}
                    />
                  </>
                )}
            </div>

            <div className="h-20 w-[260px] flex flex-col justify-center p-2.5">
              <div className="flex flex-row h-6">
                <h1 className="text-lg mr-3 whitespace-nowrap overflow-hidden text-ellipsis text-foreground">
                  {showDisplayName && discord_user.global_name
                    ? discord_user.global_name
                    : discord_user.username}

                  {!hideDiscrim &&
                    !showDisplayName &&
                    discord_user.discriminator !== "0" && (
                      <span
                        className="text-foreground"
                      >
                        #{discord_user.discriminator}
                      </span>
                    )}
                </h1>
                {/* @ts-ignore */}
                {!hideClan &&
                  // @ts-ignore
                  discord_user.clan &&
                  // @ts-ignore
                  (discord_user.clan.tag || discord_user.clan.badge) && (
                    <span
                      className="rounded-md px-2 -ml-1.5 mr-3 flex items-center gap-1 text-base font-medium h-full"
                      style={{ backgroundColor: clanBackgroundColor }}
                    >
                      {images.clanBadge && (
                        <img src={images.clanBadge} alt="Clan Badge" />
                      )}
                      <p className="mb-[1.1rem] whitespace-nowrap">
                        {
                          // @ts-ignore
                          discord_user.clan.tag
                        }
                      </p>
                    </span>
                  )}

                {!hideBadges &&
                  flags.length > 0 &&
                  flags.map((flag, index) => (
                    <img
                      key={index}
                      alt={flag}
                      src={Badges[flag]}
                      className="h-5 relative top-1/2 -translate-y-1/2 mr-1.5"
                    />
                  ))}
              </div>

              {showDisplayName && (
                <h2 className="text-[0.95rem] m-0 whitespace-nowrap font-normal text-muted-foreground">
                  {discord_user.username}
                </h2>
              )}

              {userStatus && !hideStatus && (
                <p
                  className={`text-[0.9rem] m-0 font-normal overflow-hidden whitespace-nowrap text-ellipsis text-muted-foreground`}
                >
                  {userStatus.emoji?.id && images.statusEmoji && (
                    <img
                      src={images.statusEmoji}
                      alt="User Status Emoji"
                      className="w-[15px] h-[15px] relative top-[10px] -translate-y-1/2 mr-0.5 inline"
                    />
                  )}

                  {userStatus.state &&
                  userStatus.emoji?.name &&
                  !userStatus.emoji.id
                    ? `${userStatus.emoji.name} ${userStatus.state}`
                    : userStatus.state
                    ? userStatus.state
                    : !userStatus.state &&
                      userStatus.emoji?.name &&
                      !userStatus.emoji.id
                    ? userStatus.emoji.name
                    : null}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Activities section */}
        {displayActivities.length > 0 && hideActivity !== "true" && (
          <div className="activities-container flex-1 overflow-y-auto">
            {displayActivities.map((activity, index) => (
              <div
                key={`activity-${index}`}
                className={`flex flex-row min-h-[80px] ml-1.5 text-xs pt-2 ${
                  index < displayActivities.length - 1
                    ? `pb-2 border-b text-foreground`
                    : "pb-0"
                } overflow-hidden`}
              >
                <div className="mr-4 w-16 h-16 relative shrink-0">
                  {images[`largeImage_${index}`] ? (
                    <img
                      src={images[`largeImage_${index}`]}
                      alt={`Activity ${index + 1} Large Image`}
                      className="w-16 h-16 border border-[#222] rounded-[10px] object-cover"
                    />
                  ) : (
                    <img
                      src="https://lanyard-profile-readme.vercel.app/assets/unknown.png"
                      alt="Unknown Icon"
                      className="w-14 h-14 mt-1 filter invert-100 object-contain"
                    />
                  )}

                  {images[`smallImage_${index}`] && (
                    <img
                      src={images[`smallImage_${index}`]}
                      alt={`Activity ${index + 1} Small Image`}
                      className="w-6 h-6 rounded-full absolute bottom-0 right-0"
                      style={{
                        border: `2px solid #${backgroundColor}`,
                      }}
                    />
                  )}
                </div>

                <div
                  className={`text-[#999] ${
                    activity.timestamps?.start && !hideTimestamp
                      ? "-mt-1.5"
                      : "mt-1.5"
                  } leading-tight w-[calc(100%-85px)] overflow-hidden`}
                >
                  <p
                    className={`text-foreground text-[0.85rem] font-bold overflow-hidden whitespace-nowrap text-ellipsis my-1.5`}
                  >
                    {activity.name}
                  </p>

                  {activity.details && (
                    <p
                      className={`text-muted-foreground overflow-hidden whitespace-nowrap text-[0.85rem] text-ellipsis my-1.5`}
                    >
                      {activity.details}
                    </p>
                  )}

                  {activity.state && (
                    <p
                      className={`text-muted-foreground overflow-hidden whitespace-nowrap text-[0.85rem] text-ellipsis my-1.5`}
                    >
                      {activity.state}
                      {activity.party?.size
                        ? // @ts-ignore
                          ` (${activity.party.size[0]} of ${activity.party.size[1]})`
                        : null}
                    </p>
                  )}

                  {activity.timestamps?.start && !hideTimestamp && (
                    <p
                      className={`text-muted-foreground overflow-hidden whitespace-nowrap text-[0.85rem] text-ellipsis my-1.5`}
                    >
                      {elapsedTime(activity.timestamps.start)} elapsed
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Spotify section */}
        {listening_to_spotify &&
          displayActivities.length === 0 &&
          !hideSpotify &&
          activities.some((a) => a.type === 2) && (
            <div className="flex flex-row h-[120px] ml-4 text-sm pt-4.5">
              <div className="mr-4 w-16 h-16 relative shrink-0">
                {images.spotifyAlbum ? (
                  <img
                    src={images.spotifyAlbum}
                    alt="Album Cover"
                    className="w-16 h-16 border border-[#222] rounded-[10px] object-cover"
                  />
                ) : (
                  <img
                    src="https://lanyard-profile-readme.vercel.app/assets/unknown.png"
                    alt="Unknown Album"
                    className="w-14 h-14 mt-1 filter invert-100 object-contain"
                  />
                )}
              </div>

              <div className="text-muted-foreground-mt-0.5 leading-none w-[279px]">
                <p
                  className={`text-xs font-bold ${
                    theme === "dark" ? "text-[#1CB853]" : "text-[#0d943d]"
                  } mb-4`}
                >
                  LISTENING TO SPOTIFY...
                </p>
                <p
                  className={`h-[15px] ${
                    theme === "dark" ? "text-white" : "text-black"
                  } font-bold text-[0.85rem] overflow-hidden whitespace-nowrap text-ellipsis my-1.5`}
                >
                  {spotify?.song || "Unknown Song"}
                </p>
                <p
                  className={`my-1.5 h-[15px] overflow-hidden whitespace-nowrap text-[0.85rem] text-ellipsis ${
                    theme === "dark" ? "text-[#ccc]" : "text-[#777]"
                  }`}
                >
                  By {spotify?.artist || "Unknown Artist"}
                </p>
              </div>
            </div>
          )}

        {/* Idle message */}
        {!activity &&
          (!listening_to_spotify || hideSpotify) &&
          hideActivity === "false" && (
            <div className="flex flex-row h-[150px] justify-center items-center">
              <p
                className={`italic text-sm text-muted-foreground text-center`}
              >
                {idleMessage}
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default LanyardCard;
