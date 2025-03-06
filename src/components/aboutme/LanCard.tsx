"use client";

import React, { useState, useEffect } from "react";
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
  } = data || { discord_user: {}, discord_status: "offline", activities: [], listening_to_spotify: false };

  //console.log(activities)

  // Prepare the activities to display - filter out ignored app IDs
  const parsedIgnoreAppId = parseAppId(ignoreAppId);
  const filteredActivities = activities
    .filter((activity) => activity.type === 0)
    .filter(
      (activity) => !parsedIgnoreAppId.includes(activity.application_id || "")
    );
  // Get up to 2 activities to display
  const displayActivities = filteredActivities.slice(0, 2);
  const activity = filteredActivities[0];
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
              ? Number(BigInt(discord_user.id) >> BigInt(22)) % 6
              : Number(discord_user.discriminator) % 5;
          newImages.avatar = `https://cdn.discordapp.com/embed/avatars/${discriminatorNum}.png`;
        }

        // Load clan badge
        if (discord_user.clan && !hideClan) {
          newImages.clanBadge = `https://cdn.discordapp.com/clan-badges/${discord_user.clan.identity_guild_id}/${discord_user.clan.badge}.png?size=16`;
        }

        // Load avatar decoration
        if (discord_user.avatar_decoration_data && !hideDecoration) {
          newImages.avatarDecoration = `https://cdn.discordapp.com/avatar-decoration-presets/${discord_user.avatar_decoration_data.asset}.png?size=64&passthrough=${animatedDecoration}`;
        }

        // Load activity assets for all display activities
        for (let i = 0; i < displayActivities.length; i++) {
          const activity = displayActivities[i];
          
          if (activity?.assets?.large_image) {
            newImages[`largeImage_${i}`] = activity.assets.large_image.startsWith(
              "mp:external/"
            )
              ? `https://media.discordapp.net/external/${activity.assets.large_image.replace(
                  "mp:external/",
                  ""
                )}`
              : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.webp`;
          }

          if (activity?.assets?.small_image) {
            newImages[`smallImage_${i}`] = activity.assets.small_image.startsWith(
              "mp:external/"
            )
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
  }, [
    data,
    hideDecoration,
    hideClan,
    hideSpotify,
    avatarExtension,
    statusExtension,
    animatedDecoration,
    displayActivities,
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
    <div
      className="lanyard-card w-full h-full" // Changed to h-full and removed max-width
      style={{
        fontFamily: `'Century Gothic', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
        position: "relative",
      }}
    >
      <style>
        {`
          .lanyard-card .hover-opacity {
            transition: opacity 0.2s ease;
          }
          .lanyard-card .hover-opacity:hover {
            opacity: 0.25;
          }
          .lanyard-card .transition {
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 200ms;
          }
        `}
      </style>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          inset: 0,
          /* backgroundColor: `#${backgroundColor}`, */
          color: theme === "dark" ? "#fff" : "#000",
          fontSize: "16px",
          display: "flex",
          flexDirection: "column",
          padding: "5px",
          borderRadius,
        }}
      >
        {!hideProfile && (
          <div
            style={{
              width: "100%",
              height: "100px",
              inset: 0,
              display: "flex",
              flexDirection: "row",
              paddingBottom: "5px",
              borderBottom:
                hideActivity !== "false" && !activity && !listening_to_spotify
                  ? ""
                  : `solid 0.5px ${
                      theme === "dark"
                        ? "hsla(0, 0%, 100%, 0.1)"
                        : "hsla(0, 0%, 0%, 0.1)"
                    }`,
            }}
          >
            <div
              style={{
                display: "flex",
                position: "relative",
                flexDirection: "row",
                height: "80px",
                width: "80px",
              }}
            >
              <img
                src={images.avatar}
                alt="User Avatar"
                style={{
                  borderRadius: "50%",
                  border: `3px solid ${avatarBorderColor}`,
                  width: "50px",
                  height: "50px",
                  position: "relative",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {!hideDecoration && discord_user.avatar_decoration_data && (
                <>
                  <img
                    src={images.avatarDecoration}
                    alt="Avatar Decoration"
                    style={{
                      display: "block",
                      width: "64px",
                      height: "64px",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                    className="hover-opacity transition"
                  />

                  <span
                    style={{
                      position: "absolute",
                      bottom: "14px",
                      right: "14px",
                      height: "13px",
                      width: "13px",
                      backgroundColor: avatarBorderColor,
                      borderRadius: "50%",
                      border: `3px solid #${backgroundColor}`,
                    }}
                  />
                </>
              )}
            </div>

            <div
              style={{
                height: "80px",
                width: "260px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "10px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "25px",
                  
                }}
              >
                <h1
                  style={{
                    fontSize: "1.15rem",
                    margin: "0 12px 0 0",
                    whiteSpace: "nowrap",
                  }}
                >
                  {showDisplayName && discord_user.global_name
                    ? discord_user.global_name
                    : discord_user.username}

                  {!hideDiscrim &&
                    !showDisplayName &&
                    discord_user.discriminator !== "0" && (
                      <span
                        style={{
                          color: theme === "dark" ? "#ccc" : "#666",
                          fontWeight: "lighter",
                        }}
                      >
                        #{discord_user.discriminator}
                      </span>
                    )}
                </h1>

                {!hideClan &&
                  discord_user.clan &&
                  (discord_user.clan.tag || discord_user.clan.badge) && (
                    <span
                      style={{
                        backgroundColor: clanBackgroundColor,
                        borderRadius: "0.375rem",
                        paddingLeft: "0.5rem",
                        paddingRight: "0.5rem",
                        marginLeft: "-6px",
                        marginRight: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
                        height: "100%",
                      }}
                    >
                      {images.clanBadge && (
                        <img src={images.clanBadge} alt="Clan Badge" />
                      )}
                      <p
                        style={{ marginBottom: "1.1rem", whiteSpace: "nowrap" }}
                      >
                        {discord_user.clan.tag}
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
                      style={{
                        width: "auto",
                        height: "20px",
                        position: "relative",
                        top: "50%",
                        transform: "translate(0%, -50%)",
                        marginRight: "7px",
                      }}
                    />
                  ))}
              </div>

              {showDisplayName && (
                <h2
                  style={{
                    fontSize: "0.95rem",
                    margin: 0,
                    whiteSpace: "nowrap",
                    fontWeight: "400",
                  }}
                >
                  {discord_user.username}
                </h2>
              )}

              {userStatus && !hideStatus && (
                <p
                  style={{
                    fontSize: "0.9rem",
                    margin: 0,
                    color: theme === "dark" ? "#aaa" : "#333",
                    fontWeight: 400,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {userStatus.emoji?.id && images.statusEmoji && (
                    <img
                      src={images.statusEmoji}
                      alt="User Status Emoji"
                      style={{
                        width: "15px",
                        height: "15px",
                        position: "relative",
                        top: "10px",
                        transform: "translate(0%, -50%)",
                        margin: "0 2px 0 0",
                      }}
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

        {/* Activities section - now supports multiple activities */}
        {displayActivities.length > 0 && hideActivity !== "true" && (
          <div className="activities-container" style={{ flex: 1 }}>
            {displayActivities.map((activity, index) => (
              <div
                key={`activity-${index}`}
                className="overflow-hidden"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  minHeight: "80px", // Reduced height for multiple activities
                  marginLeft: "6px",
                  fontSize: "0.75rem",
                  paddingTop: "8px",
                  paddingBottom: index < displayActivities.length - 1 ? "8px" : "0",
                  borderBottom: index < displayActivities.length - 1 
                    ? `solid 0.5px ${theme === "dark" ? "hsla(0, 0%, 100%, 0.05)" : "hsla(0, 0%, 0%, 0.05)"}`
                    : "none",
                }}
              >
                <div
                  style={{
                    marginRight: "15px",
                    width: "64px",
                    height: "64px",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  {images[`largeImage_${index}`] ? (
                    <img
                      src={images[`largeImage_${index}`]}
                      alt={`Activity ${index + 1} Large Image`}
                      style={{
                        width: "64px",
                        height: "64px",
                        border: "solid 0.5px #222",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <img
                      src="https://lanyard-profile-readme.vercel.app/assets/unknown.png"
                      alt="Unknown Icon"
                      style={{
                        width: "56px",
                        height: "56px",
                        marginTop: "4px",
                        filter: "invert(100)",
                        objectFit: "contain",
                      }}
                    />
                  )}

                  {images[`smallImage_${index}`] && (
                    <img
                      src={images[`smallImage_${index}`]}
                      alt={`Activity ${index + 1} Small Image`}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        border: `2px solid #${backgroundColor}`,
                      }}
                    />
                  )}
                </div>

                <div
                  style={{
                    color: "#999",
                    marginTop: activity.timestamps?.start && !hideTimestamp ? "-6px" : "5px",
                    lineHeight: "1.2",
                    width: "calc(100% - 85px)", // Adjust width to prevent overflow
                    overflow: "hidden",
                  }}
                >
                  <p
                    style={{
                      color: theme === "dark" ? "#fff" : "#000",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      margin: "5px 0",
                    }}
                  >
                    {activity.name}
                  </p>

                  {activity.details && (
                    <p
                      style={{
                        color: theme === "dark" ? "#ccc" : "#777",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "0.85rem",
                        textOverflow: "ellipsis",
                        margin: "5px 0",
                      }}
                    >
                      {activity.details}
                    </p>
                  )}

                  {activity.state && (
                    <p
                      style={{
                        color: theme === "dark" ? "#ccc" : "#777",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "0.85rem",
                        textOverflow: "ellipsis",
                        margin: "5px 0",
                      }}
                    >
                      {activity.state}
                      {activity.party?.size
                        ? ` (${activity.party.size[0]} of ${activity.party.size[1]})`
                        : null}
                    </p>
                  )}

                  {activity.timestamps?.start && !hideTimestamp && (
                    <p
                      style={{
                        color: theme === "dark" ? "#ccc" : "#777",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "0.85rem",
                        textOverflow: "ellipsis",
                        margin: "5px 0",
                      }}
                    >
                      {elapsedTime(activity.timestamps.start)} elapsed
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Spotify section - keep as is but only show if no activities */}
        {listening_to_spotify &&
          displayActivities.length === 0 &&
          !hideSpotify &&
          activities.some((a) => a.type === 2) && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "120px",
                marginLeft: "15px",
                fontSize: "0.8rem",
                paddingTop: "18px",
              }}
            >
              <div
                style={{
                  marginRight: "15px",
                  width: "64px", // Changed from 80px
                  height: "64px", // Changed from 80px
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                {images.spotifyAlbum ? (
                  <img
                    src={images.spotifyAlbum}
                    alt="Album Cover"
                    style={{
                      width: "64px", // Changed from 80px
                      height: "64px", // Changed from 80px
                      border: "solid 0.5px #222",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src="https://lanyard-profile-readme.vercel.app/assets/unknown.png"
                    alt="Unknown Album"
                    style={{
                      width: "56px", // Changed from 70px
                      height: "56px", // Changed from 70px
                      marginTop: "4px",
                      filter: "invert(100)",
                      objectFit: "contain",
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  color: "#999",
                  marginTop: "-3px",
                  lineHeight: "1",
                  width: "279px",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    color: theme === "dark" ? "#1CB853" : "#0d943d",
                    marginBottom: "15px",
                  }}
                >
                  LISTENING TO SPOTIFY...
                </p>
                <p
                  style={{
                    height: "15px",
                    color: theme === "dark" ? "#fff" : "#000",
                    fontWeight: "bold",
                    fontSize: "0.85rem",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    margin: "7px 0",
                  }}
                >
                  {spotify?.song || "Unknown Song"}
                </p>
                <p
                  style={{
                    margin: "7px 0",
                    height: "15px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    fontSize: "0.85rem",
                    textOverflow: "ellipsis",
                    color: theme === "dark" ? "#ccc" : "#777",
                  }}
                >
                  By {spotify?.artist || "Unknown Artist"}
                </p>
              </div>
            </div>
          )}

        {/* Idle message when no activity or Spotify */}
        {!activity &&
          (!listening_to_spotify || hideSpotify) &&
          hideActivity === "false" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "150px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  color: theme === "dark" ? "#aaa" : "#444",
                  height: "auto",
                  textAlign: "center",
                }}
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
