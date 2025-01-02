"use client";

import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
import React, { useState } from "react";

const PGB = () => {
  const [timerStarted, setTimerStarted] = useState(false);

  return (
    <div>
      <ProgressBar timerStarted={timerStarted} />

      <div className="flex mt-10 ml-10 gap-10">
        <button
          className="rounded px-4 py-2 text-white bg-green-500 hover:bg-green-700"
          onClick={() => setTimerStarted(true)}
        >
          Start Loading
        </button>
        <button
          className="rounded px-4 py-2 text-white bg-green-500 hover:bg-green-700"
          onClick={() => setTimerStarted(false)}
        >
          End Loading
        </button>
      </div>
    </div>
  );
};

export default PGB;
