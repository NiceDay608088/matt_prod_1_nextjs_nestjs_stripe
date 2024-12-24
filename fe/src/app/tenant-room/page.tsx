import RentInfoCollectionStepBar from "@/components/RentInfoCollectionStepBar/RentInfoCollectionStepBar";
import React from "react";
import Image from "next/image";
import { BsWindow } from "react-icons/bs";
import Payment from "@/components/Payment/Payment";

interface PropType {
  name: string;
  imageUrl: string;
  address: string;
}

const TenantRoomPage = () => {
  return (
    <div className="flex flex-col mt-5 gap-10">
      <div className="hidden sm:block">
        <RentInfoCollectionStepBar />
      </div>
      <div className="flex flex-col xl:flex-row gap-2 m-5">
        {/* left panel */}
        <div className="flex-1 flex flex-col sm:flex-row  gap-4">
          <div className="w-full sm:w-[250px] h-[250px]">
            <Image
              src="/rental_property_default.jpg"
              width={250}
              height={250}
              className="object-cover w-full h-full"
              alt="Property"
            />
          </div>
          {/* Left panel -> Right text */}
          <div className="flex flex-col justify-between px-4 gap-7">
            {/* Top Text */}
            <div className="flex flex-col gap-3">
              <div className="font-bold text-2xl">Name</div>
              <div className="text-gray-400">Address</div>
            </div>
            {/* Bottom Text */}
            <div className="flex flex-col gap-3">
              <div className="flex text-red-700 items-center gap-3">
                <BsWindow size={25} /> Overall rating: 3
              </div>
              <div>Welcome to book the room</div>
            </div>
          </div>
        </div>
        {/* Right panel */}
        <div className="flex-1 p-4 flex flex-col gap-4">
          <div className="text-gray-500 text-lg">
            Once the holding deposit is paid, we shall reserve the property for
            you and remove the property from the market.
          </div>
          <div className="mt-10">
            <Payment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantRoomPage;
