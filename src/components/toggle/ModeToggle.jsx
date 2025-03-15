
import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={"outline"}
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative cursor-pointer rounded-2xl border-none "
    >
      {/* Sun Icon (Visible in Light Mode) */}
      <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all dark:rotate-90 dark:scale-0" />

      {/* Moon Icon (Visible in Dark Mode) */}
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />

      {/* Accessible Label */}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
