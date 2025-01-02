import React, { useEffect, useState } from "react";

interface PropType {
  timerStarted: boolean;
}

export const ProgressBar = ({ timerStarted }: PropType) => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  //   console.log("uuid intervalId", uuidv4(), intervalId);

  useEffect(() => {
    if (timerStarted) {
      setVisible(true);
      if (progress == 100) {
        setProgress(0);
      }
      const tmpId = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(intervalId!);
            return prev;
          }
          return prev + 10;
        });
      }, 100);
      setIntervalId(tmpId);
    } else {
      setProgress(100);
      const tmpId = setTimeout(() => {
        setVisible(false);
      }, 300);
      setTimeoutId(tmpId);
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
