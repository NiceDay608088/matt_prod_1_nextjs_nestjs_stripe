import React from "react";
import { IoWalletOutline } from "react-icons/io5";
import { LiaIdCard } from "react-icons/lia";
import { LuSquareChartGantt } from "react-icons/lu";
import MyIcon from "../MyIcon/MyIcon";

const RentInfoCollectionStepBar = () => {
  return (
    <div className="px-4 flex">
      {/* First Odd Column */}
      <div className="flex flex-col items-center text-center">
        <MyIcon
          component={IoWalletOutline}
          textColor="text-white"
          bgColor="bg-red-700"
        />
        <div className="mt-6 text-red-700">
          Step 1 <br />
          Holding deposit
        </div>
      </div>

      {/* Line */}
      <div className="flex justify-center flex-1 mt-8">
        <div className="w-full h-1 bg-gray-300"></div>
      </div>

      {/* Second Odd Column */}
      <div className="flex flex-col items-center text-center">
        <MyIcon
          component={LuSquareChartGantt}
          // textColor="text-white"
          // bgColor="bg-red-700"
        />
        <div className="mt-6">
          Step 2 <br />
          Credit and referencing
        </div>
      </div>

      {/* Line */}
      <div className="flex justify-center flex-1 mt-8">
        <div className=" w-full h-1 bg-gray-300"></div>
      </div>

      {/* Final Odd Column */}
      <div className="flex flex-col items-center text-center">
        <MyIcon
          component={LiaIdCard}
          // textColor="text-white"
          // bgColor="bg-red-700"
        />
        <div className="mt-6">
          Step 3 <br />
          Tenancy agreement
        </div>
      </div>
    </div>
  );
};

export default RentInfoCollectionStepBar;
