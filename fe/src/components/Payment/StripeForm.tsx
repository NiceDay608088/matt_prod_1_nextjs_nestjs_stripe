import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FiCreditCard } from "react-icons/fi";

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  /*
    Card Number: 4242 4242 4242 4242
    Expiration Date (MM/YY): 12/25
    CVC: 123
    ZIP Code: 12345
  */
  const handlePayment = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe or Elements has not loaded yet.");
      return;
    }

    try {
      // Step 1: Create a payment intent on the server
      const response = await fetch(
        "http://localhost:3001/payment/webhooks/stripe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: 25,
            amount: 30,
          }),
        }
      );

      if (!response.ok) {
        const responseBody = await response.text();
        console.error("Payment Intent API Error:", responseBody);
        throw new Error(`Payment Intent API failed: ${responseBody}`);
      }

      const { client_secret: clientSecret } = await response.json();
      console.log("Payment Intent created successfully:", clientSecret);

      // Step 2: Confirm the card payment
      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);

      if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
        console.error(
          "CardNumberElement or CardExpiryElement or CardCvcElement is null."
        );
        throw new Error(
          "CardNumberElement or CardExpiryElement or CardCvcElement is null."
        );
      }

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
          },
        }
      );

      if (error) {
        console.error("Error confirming card payment:", error.message);
        throw new Error(error.message);
      }

      console.log("Payment successful:", paymentIntent);
    } catch (err) {
      console.error("Payment processing error:", err);
    }
  };

  return (
    <form className="w-full flex justify-center">
      <div className="min-w-[350px] w-full sm:w-[480px] flex flex-col text-lg gap-10">
        {/* input fields */}
        <div className="flex flex-col shadow-lg bg-white">
          {/* card number row */}
          <div className="flex items-center  py-4 gap-5">
            <span className="w-32 text-right">Card number</span>
            <CardNumberElement className="flex-1" />
            <span className="pr-4">
              <FiCreditCard size={25} className=" text-gray-500" />
            </span>
          </div>
          {/* expiry date row */}
          <div className="flex items-center gap-5">
            <span className="w-32 text-right">Expiry date</span>
            <CardExpiryElement className="flex-1" />
          </div>
          {/* cvc */}
          <div className="flex items-center py-4 gap-5">
            <span className="w-32 text-right">CVC</span>
            <CardCvcElement className="flex-1" />
          </div>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-[#666EE8] text-white py-2"
        >
          Pay $25
        </button>
      </div>
    </form>
  );
};

export default StripeForm;
