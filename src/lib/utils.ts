import { type ClassValue, clsx } from "clsx";
import { DiscordUser, LanyardData } from "react-use-lanyard";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function statusColors(status: LanyardData | undefined) {
  if (status?.discord_status === "online") return "green-500";
  else if (status?.discord_status === "dnd") return "red-500";
  else if (status?.discord_status === "idle") return "yellow-500";
  else return "gray-500";
}

export function statusText(status: LanyardData | undefined) {
  if (status?.active_on_discord_desktop || status?.active_on_discord_web) {
    if (status?.discord_status === "online") return "Online on Desktop";
    else if (status?.discord_status === "dnd")
      return "Do Not Disturb on Desktop";
    else if (status?.discord_status === "idle") return "Idle on Desktop";
  } else if (status?.active_on_discord_mobile) {
    if (status?.discord_status === "online") return "Online on Mobile";
    else if (status?.discord_status === "dnd") return "Do Not Disturb on Mobile";
    else if (status?.discord_status === "idle") return "Idle on Mobile";
  } else return "Offline";
}
