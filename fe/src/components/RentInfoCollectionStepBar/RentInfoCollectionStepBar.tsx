import React from "react";
import { IoWalletOutline } from "react-icons/io5";
import MyIcon from "../MyIcon/MyIcon";

const RentInfoCollectionStepBar: React.FC = () => {
  return (
    <div className="mx-auto px-4 flex justify-between">
      {/* First Odd Column */}
      <div className="flex flex-col items-center text-center">
        <MyIcon
          component={IoWalletOutline}
          textColor="text-white"
          bgColor="bg-red-700"
        />
        <div className="text-lg mt-8 ">
          This is content for the first odd column.
        </div>
      </div>

      {/* Line */}
      <div className="flex justify-center w-1/4 mt-8">
        <div className="w-full h-1 bg-gray-300"></div>
      </div>

      {/* Second Odd Column */}
      <div className="flex flex-col items-center text-center">
        <MyIcon component={IoWalletOutline} />
        <div className="text-lg mt-8">
          This is content for the second odd column.
        </div>
      </div>

      {/* Line */}
      <div className="flex justify-center w-1/4 mt-8">
        <div className=" w-full h-1 bg-gray-300"></div>
      </div>

      {/* Final Odd Column */}
      <div className="flex flex-col items-center text-center">
        <MyIcon component={IoWalletOutline} />
        <div className="text-lg mt-8">
          This is content for the last odd column.
        </div>
      </div>
    </div>
  );
};

export default RentInfoCollectionStepBar;
