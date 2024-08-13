// button and other component imports here

import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
        Pomodoro Timer
      </h1>
      <ThemeToggle />
    </>
  );
}
