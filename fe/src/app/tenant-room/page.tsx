import RentInfoCollectionStepBar from "@/components/RentInfoCollectionStepBar/RentInfoCollectionStepBar";
import React from "react";
import Image from "next/image";
import { BsWindow } from "react-icons/bs";
import Payment from "@/components/Payment/Payment";
import { graphql_request } from "@/utils/request";
import { GQL_GET_RENTAL_PROPERTY_QUERY } from "@/utils/Contants";

async function fetchServerData(id: string) {
  const res = await graphql_request(GQL_GET_RENTAL_PROPERTY_QUERY, {
    id,
  });

  const result = await res.json();

  if (result.errors) {
    console.log("fetchServerData error:", result.errors);
    return null;
  }

  return result.data.getRentalProperty;
}

const TenantRoomPage = async ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  // ssr
  const params = await searchParams;
  const res = await fetchServerData(params.id);

  if (!res) {
    return <div>Record id "{params.id}" doesn't exist.</div>;
  }

  return (
    <div className="flex flex-col mt-5 gap-10">
      <div className="hidden sm:block">
        <RentInfoCollectionStepBar />
      </div>
      <div className="p-0 sm:px-8 lg:p-0 flex flex-col lg:flex-row  gap-12 xl:gap-0 m-5">
        {/* left panel */}
        <div className="flex-1 flex flex-col sm:flex-row sm:justify-center w-full ">
          {/* Left panel -> Left Image */}
          <div className="min-w-[250px] sm:w-[250px] h-[250px]">
            <Image
              src="/rental_property_default.jpg"
              width={250}
              height={250}
              className="object-cover w-full h-full"
              alt="Property"
            />
          </div>
          {/* Left panel -> Right text */}
          <div className="flex-1 flex flex-col justify-between px-4 gap-7">
            {/* Top Text */}
            <div className="flex flex-col gap-3">
              <div className="font-bold text-2xl">{res.name}</div>
              <div className="text-gray-400">{res.address}</div>
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
        <div className="flex-1 ">
          <Payment id={params.id} />
        </div>
      </div>
    </div>
  );
};

export default TenantRoomPage;
