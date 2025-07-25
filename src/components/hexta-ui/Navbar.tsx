"use client";

import { Menu, MenuItem, MenuDivider } from "@/components/hexta-ui/Menu";
import { ModeToggle } from "@/components/mode-toggle";

import { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";

import { FaHome, FaPhone, FaRocket, FaUser } from "react-icons/fa";
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75M2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8m6 4.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <Menu
              className="max-[650px]:flex hidden w-fit rounded-[20px] z-50 text-foreground bg-card/80 backdrop-blur-[6px] shadow-feature-card dark:shadow-feature-card-dark border-0 ring-0"
              onOpen={toggleMenu}
              onClose={toggleMenu}
              isOpen={menuOpen}
            >
              <MenuItem>
                <Link
                  href="/"

                  className="flex items-center gap-3 h-full w-full"
                >
                  <FaHome /> Home
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href="/#about"
                  className="flex items-center gap-3 h-full w-full"
                >
                  <FaUser /> About
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href="/projects"
                  className="flex items-center gap-3 h-full w-full"
                >
                  <FaRocket /> Projects
                </Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <Link
                  href="/#contact"
                  className="flex items-center gap-3 h-full w-full"
                >
                  <FaPhone /> Contact
                </Link>
              </MenuItem>
            </Menu>
          </div>
          <ul className="flex items-center justify-center text-[14px] gap-7 max-[650px]:hidden">
            <li>
              <Link
                href="/"
                className="opacity-80 hover:opacity-100 hover:underline transition-all text-foreground"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="opacity-80 hover:opacity-100 hover:underline transition-all text-foreground"
              >
                About
              </Link>
            </li>
            <li>
              <a
                href="/projects"
                className="opacity-80 hover:opacity-100 hover:underline transition-all text-foreground"
              >
                Projects
              </a>
            </li>
            <li>
              <Link
                href="/#contact"
                className="opacity-80 hover:opacity-100 hover:underline transition-all text-foreground"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};