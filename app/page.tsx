import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Timer from "@/components/Timer";
import Settings from "@/components/Settings";

import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center p-8">
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
          Pomodoro Timer
        </h1>

        {/* Adjust main page spacing and stuff after */}

        <Timer />

        <ThemeToggle />

        <Settings />
      </div>
    </>
  );
}
