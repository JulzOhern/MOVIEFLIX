import React from "react";
import { UserButton, auth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import NavbarClient from "./navbarClient";
import NavbarSearchButton from "./navbarSearchButton";
import Link from "next/link";

const Navbar = () => {
  const { userId } = auth();

  return (
    <div className="flex items-center justify-between fixed inset-x-0 h-16 px-5 z-[500] bg-zinc-900 border-b border-zinc-800">
      <div className="flex items-center gap-5 flex-1 mr-10">
        <NavbarClient />
      </div>

      <div className="flex items-center gap-5">
        <NavbarSearchButton />
        {!userId && (
          <Link className="text-zinc-400 text-sm" href="/sign-in">
            Sign in
          </Link>
        )}
        {userId && (
          <UserButton
            appearance={{
              baseTheme: dark,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
