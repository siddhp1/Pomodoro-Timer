"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";

const TIMER_VALUES = {
  pomodoro: 25 * 60, // 25 minutes in seconds
  shortBreak: 5 * 60, // 5 minutes in seconds
  longBreak: 15 * 60, // 15 minutes in seconds
};

type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(TIMER_VALUES.pomodoro);
  const [isActive, setIsActive] = useState(false);
  const [currentMode, setCurrentMode] = useState<TimerMode>("pomodoro");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Cleanup on component unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSkip(); // Automatically skip to the next session when time is up
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleSkip = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    if (currentMode === "pomodoro") {
      setCurrentMode("shortBreak");
      setTimeLeft(TIMER_VALUES.shortBreak);
    } else if (currentMode === "shortBreak") {
      setCurrentMode("longBreak");
      setTimeLeft(TIMER_VALUES.longBreak);
    } else {
      setCurrentMode("pomodoro");
      setTimeLeft(TIMER_VALUES.pomodoro);
    }
  };

  const handleModeChange = (mode: TimerMode) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    setCurrentMode(mode);
    setTimeLeft(TIMER_VALUES[mode]);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <Button
              variant="secondary"
              className="px-20"
              onClick={() => handleModeChange("pomodoro")}
            >
              Pomodoro
            </Button>
            <Button
              variant="secondary"
              className="px-20"
              onClick={() => handleModeChange("shortBreak")}
            >
              Short Break
            </Button>
            <Button
              variant="secondary"
              className="px-20"
              onClick={() => handleModeChange("longBreak")}
            >
              Long Break
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:my-36">
            <p className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-20xl">
              {formatTime(timeLeft)}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleStartStop}>
            {isActive ? "Stop" : "Start"}
          </Button>
          <Button variant="secondary" className="px-20" onClick={handleSkip}>
            Skip to Next
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
