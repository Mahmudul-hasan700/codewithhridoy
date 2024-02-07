"use client";

import { useTheme } from "next-themes";
import { SunIcon } from "@heroicons/react/24/outline";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center">
      <SunIcon className="mr-2 h-4 w-4" />
      <select
        name="themeSwitch"
        value={theme}
        onChange={e => setTheme(e.target.value)}
        aria-label="Select theme">
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
};

export default ThemeSwitch;
