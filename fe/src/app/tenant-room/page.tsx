import RentInfoCollectionStepBar from "@/components/RentInfoCollectionStepBar/RentInfoCollectionStepBar";
import React from "react";
import Image from "next/image";
import { BsWindow } from "react-icons/bs";

interface PropType {
  name: string;
  imageUrl: string;
  address: string;
}

const TenantRoomPage = () => {
  return (
    <div className="m-12 text-lg ">
      <RentInfoCollectionStepBar />
      <div className="flex w-full justify-between gap-12 mt-10">
        {/* left panel */}
        <div className="flex-1 flex gap-6">
          {/* left panel -> left image*/}
          <div className="flex-shrink-0 w-[250px] h-[250px]">
            <Image
              src="/rental_property_default.jpg"
              width={250}
              height={250}
              className="object-cover w-full h-full"
              alt=""
            />
          </div>
          {/* left panel -> right text*/}
          <div className="flex flex-col justify-between h-full w-full ">
            <div className="flex flex-col gap-3">
              <div className="font-bold text-2xl ">name</div>
              <div className=" text-gray-400">address</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex text-red-700 items-center gap-3">
                <BsWindow size={25} /> Overall rating 3
              </div>
              <div className="">Welcome to book the room</div>
            </div>
          </div>
        </div>
        {/* right panel */}
        <div className="flex-1 flex flex-col">
          <div className="text-gray-600">
            Once the holding deposit is paid, we shall reserve the property for
            you and remove the property from the market
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantRoomPage;
