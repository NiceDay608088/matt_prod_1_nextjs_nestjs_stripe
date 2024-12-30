"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import StripeForm from "./StripeForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PropType {
  id: string;
}

const Payment = ({ id }: PropType) => {
  return (
    <Elements stripe={stripePromise}>
      <StripeForm id={id} />
    </Elements>
  );
};

export default Payment;
