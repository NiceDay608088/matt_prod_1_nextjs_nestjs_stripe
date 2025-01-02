"use client";

import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { GQL_GET_RENTAL_PROPERTY_FEE } from "@/utils/Contants";
import { graphql_request } from "@/utils/request";
import React, { useEffect, useState } from "react";

interface PropType {
  id: string;
  cardType: string;
  cstClassName: string;
}

interface PriceFeeResponse {
  price: number;
  fee: string;
  total: number;
  description: string;
}

const getFeePrice = async (id: string, cardType: string) => {
  console.log("Variables for GraphQL request:", {
    rentalPropertyId: id,
    cardType,
  });
  try {
    // Step 1: Create a payment intent on the server
    const response = await graphql_request(GQL_GET_RENTAL_PROPERTY_FEE, {
      rentalPropertyId: id,
      cardType,
    });

    if (!response.ok) {
      const responseBody = await response.text();
      console.error("getFeePrice Error:", responseBody);
      throw new Error(`getFeePrice failed: ${responseBody}`);
    }

    const data = await response.json();
    // console.log("before gql data------------------------ ");
    console.log(data);
    // console.log("after gql data------------------------ ");
    const priceFee = data.data.getRentFee;
    // console.log("price fee -----------", { priceFee });
    return priceFee;
  } catch (err) {
    console.log(err);
  }

  return null;
};

const CheckPrice = ({ id, cardType, cstClassName }: PropType) => {
  console.log("cardType is", cardType);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PriceFeeResponse>();

  useEffect(() => {
    const asyncCall = async () => {
      setLoading(true);
      // console.log("before fetching fee price for id", id);
      const r = await getFeePrice(id, cardType);
      // console.log("after fetching fee price", r);
      setData(r);
      setLoading(false);
    };
    if (cardType) {
      // console.log("before asyncCall...");
      asyncCall();
    } else {
      // console.log("not validate cardType before asyncCall...");
    }
  }, [cardType]);

  // when parent page loads for the first time.
  if (!cardType) {
    console.log("cardType not valid...");
    return <div></div>;
  }

  if (loading) {
    console.log("page shows loading...");
    return (
      <div className="flex-1  flex justify-end pr-6">
        <LoadingIcon />
      </div>
    );
  }

  if (!data) {
    console.log("resonse not good...");
    return <div className={`%{cstClassName} `}></div>;
  }

  console.log(">>>>>>>>>>>>>>>>>>>>");
  return <div className={`%{cstClassName} `}>{data.total}</div>;
};

export default CheckPrice;
