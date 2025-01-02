import React, { useEffect, useState } from "react";

interface PropType {
  timerStarted: boolean;
}

export const ProgressBar = ({ timerStarted }: PropType) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  //   console.log("uuid intervalId", uuidv4(), intervalId);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    if (timerStarted) {
      setVisible(true);
      if (progress == 100) {
        setProgress(0);
      }
      intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(intervalId!);
            return prev;
          }
          return prev + 10;
        });
      }, 100);
    } else {
      setProgress(100);
      timeoutId = setTimeout(() => {
        setVisible(false);
      }, 300);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timerStarted]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-1 ${
        visible ? "block" : "hidden"
      }`}
    >
      <div
        className="bg-green-500 h-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
