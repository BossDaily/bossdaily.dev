"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";

import { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";

import { Home, Phone, Rocket, User, Menu as MenuIcon } from "lucide-react";
import { Avatar } from "./Avatar";

import { useLanyard } from "react-use-lanyard";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loading, status } = useLanyard({
		userId: "274973338676494347",
		socket: true,
	});
  let variant = "default"
  if ((status?.active_on_discord_desktop || status?.active_on_discord_web) && status?.discord_status === "online") {
    variant = "withStatus"
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="flex flex-row sm:flex-row justify-between px-3 sm:px-5 py-2 sm:py-3 top-4 z-40 sticky mx-auto max-w-full sm:max-w-5xl items-center rounded-[20px] bg-card/80 backdrop-blur-[6px] text-foreground shadow-lg">
        <div>
          {/* @ts-ignore */}
          <Avatar avatarUrl={`https://cdn.discordapp.com/avatars/${status?.discord_user.id}/${status?.discord_user.avatar}.png?size=1024&format=webp&quality=lossless&width=0&height=256`} size={48} variant={variant} />
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <div className="relative">
            <button
              className="p-[4px] hover:bg-white hover:bg-opacity-10 items-center justify-center transition-all opacity-80 hover:opacity-100 rounded-md hidden  max-[650px]:flex"
              title="menu"
              name="menu"
              onClick={toggleMenu}
            >
              <MenuIcon size={25} />
            </button>

            <NavigationMenu className={`max-[650px]:absolute max-[650px]:top-full max-[650px]:left-0 max-[650px]:right-0 max-[650px]:mt-2 w-fit rounded-[20px] z-50 text-foreground bg-card/80 backdrop-blur-[6px] shadow-feature-card dark:shadow-feature-card-dark border-0 ring-0 ${menuOpen ? 'max-[650px]:block' : 'max-[650px]:hidden'} min-[651px]:hidden`} viewport={false}>
              <NavigationMenuList className="flex flex-col space-y-0 p-2">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="flex items-center gap-3 h-full w-full px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors min-w-[150px]"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Home size={16} /> Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/#about"
                      className="flex items-center gap-3 h-full w-full px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors min-w-[150px]"
                      onClick={() => setMenuOpen(false)}
                    >
                      <User size={16} /> About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/projects"
                      className="flex items-center gap-3 h-full w-full px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors min-w-[150px]"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Rocket size={16} /> Projects
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <div className="h-px bg-border my-1" />
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/#contact"
                      className="flex items-center gap-3 h-full w-full px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors min-w-[150px]"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Phone size={16} /> Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <NavigationMenu className="max-[650px]:hidden">
            <NavigationMenuList className="flex items-center justify-center text-[14px] gap-7">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="opacity-80 hover:opacity-100 hover:underline transition-all text-foreground"
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/#about"
                    className="opacity-80 hover:opacity-100 hover:underline transition-all text-foreground"
                  >
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/projects"
                    className="opacity-80 hover:opacity-100 hover:underline transition-all text-foreground"
                  >
                    Projects
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/#contact"
                    className="opacity-80 hover:opacity-100 hover:underline transition-all text-foreground"
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </>
  );
};