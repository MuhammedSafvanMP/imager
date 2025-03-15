import React from "react";
import ModeToggle from "../toggle/ModeToggle";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <nav className=" border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
        
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              Imager
            </span>
          </NavLink>
          <div className="flex gap-3 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ModeToggle />

            {user ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
            
                <motion.button
                  className="cursor-pointer px-4 py-2 text-white bg-blue-500 rounded outlin-none"
                  animate={{
                    scale: [1, 1.1, 1],
                    backgroundColor: ["#3b82f6", "royalblue", "Highlight"],
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                >
                  Login
                </motion.button>
              </SignInButton>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
