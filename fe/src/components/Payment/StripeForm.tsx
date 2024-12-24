import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Stripe, StripeCardElement } from "@stripe/stripe-js";

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);

  const getBankCardInfo = async (
    stripe: Stripe,
    cardElement: StripeCardElement
  ) => {
    console.log("...4");
    const { token, error } = await stripe?.createToken(cardElement);
    return {
      brand: token?.card?.brand,
      country: token?.card?.country,
      error1: error,
    };
  };

  /*
    Card Number: 4242 4242 4242 4242
    Expiration Date (MM/YY): 12/25
    CVC: 123
    ZIP Code: 12345
  */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsProcessing(true);

    console.log("...");
    if (!stripe || !elements) {
      console.log("...1");
      setError("stripe or elements is missing.");
      setIsProcessing(false);
      return;
    }

    const cardElement = elements?.getElement(CardElement);
    if (!cardElement) {
      console.log("...2");
      setError("card element is missing.");
      setIsProcessing(false);
      return;
    }

    console.log("...2");
    const { brand, country, error1 } = await getBankCardInfo(
      stripe,
      cardElement
    );
    if (error1) {
      setError(error1.message);
      setIsProcessing(false);
      console.log("...5");
    } else {
      console.log("....", { brand, country });
    }

    const query = `
      mutation CreatePaymentIntent($createPaymentIntentDto: CreatePaymentIntentDto!) {
        createPaymentIntent(createPaymentIntentDto: $createPaymentIntentDto) {
          clientSecret
        }
      }
    `;
    const variables = {
      createPaymentIntentDto: {
        amount: 120,
        currency: "USD",
      },
    };
    console.log("...6");
    const res = await fetch("http://localhost:3001/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });
    const result = await res.json();
    console.log("...7");
    if (result.errors) {
      const err = result.errors[0].message;
      setError(err);
      console.log("...8", { err });
      setIsProcessing(false);
    }

    const clientSecret = result.data.createPaymentIntent.clientSecret;
    console.log({ clientSecret, result });
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card: cardElement },
      }
    );
    if (error) {
      setError(error.message);
      console.log("...9", { error });
      setIsProcessing(false);
    }

    console.log({ paymentIntent }); // 2/3 paymentIntent.id
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>{isProcessing ? "processing" : "not processing..."}</div>
      <CardElement />
      <button type="submit" disabled={isProcessing}>
        Pay Button
      </button>
      {error && <div className=" text-red-500 bg-blue-100">{error}</div>}
    </form>
  );
};

export default StripeForm;
