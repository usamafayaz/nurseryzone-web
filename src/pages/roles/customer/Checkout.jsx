import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, ChevronLeft, ShoppingCart, CreditCard } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useToaster } from "../../../components/Toaster";
import useCartStore from "../../../store/cartStore";

let stripePromise = null;

const PaymentForm = ({
  totalPrice,
  handleOrderSubmit,
  processingPayment,
  clientSecret,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    try {
      setCardError(null);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              // You can add billing details here if needed
            },
          },
        }
      );

      if (error) {
        setCardError(error.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        await handleOrderSubmit(paymentIntent.payment_method);
      }
    } catch (err) {
      setCardError("Payment processing failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="p-3 border rounded-lg"
        />
      </div>
      {cardError && <div className="text-red-500 mb-4">{cardError}</div>}
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processingPayment}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center disabled:bg-gray-400"
      >
        {processingPayment
          ? "Processing..."
          : `Pay Rs. ${totalPrice.toFixed(2)}`}
      </button>
    </form>
  );
};

const CheckoutScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState({
    clientSecret: null,
    publishableKey: null,
  });
  const addToast = useToaster();

  let storedUserData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (paymentMethod === "CARD") {
      createPaymentIntent();
    }
  }, [paymentMethod]);

  const createPaymentIntent = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(totalPrice),
        }),
      });

      if (!response.ok) {
        throw new Error("Payment intent creation failed");
      }

      const data = await response.json();
      setPaymentConfig({
        clientSecret: data.clientSecret,
        publishableKey: data.publishableKey,
      });

      // Initialize Stripe with the publishable key from backend
      stripePromise = loadStripe(data.publishableKey);
    } catch (error) {
      addToast("Failed to initialize payment: " + error.message, "error");
      setPaymentMethod("COD");
    }
  };

  const handleOrderSubmit = async (paymentMethodId = null) => {
    setProcessingPayment(true);
    try {
      const orderData = {
        user_id: storedUserData.user_id,
        plant_id: cart[0].plant_id,
        quantity: cart[0].quantity,
        payment_method: paymentMethod,
        payment_method_id: paymentMethodId,
      };

      const response = await fetch("http://localhost:8000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        removeFromCart(cart[0].plant_id);
        addToast("Order placed successfully!", "success");
        navigate("/customer/dashboard");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Order submission failed");
      }
    } catch (error) {
      addToast(error.message || "Error processing order!", "error");
      console.error("Checkout error:", error);
    } finally {
      setProcessingPayment(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-2xl mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <button
        onClick={() => navigate("/cart")}
        className="flex items-center text-green-600 mb-4"
      >
        <ChevronLeft size={24} /> Back to Cart
      </button>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information Section */}
        <div className="bg-white shadow-lg rounded-xl p-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="mr-2 text-green-600" /> Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  value={storedUserData.name}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  value={storedUserData.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  value={storedUserData.contact_number}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Address</label>
                <input
                  type="text"
                  value={storedUserData.address}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="mr-2 text-green-600" /> Payment Method
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="mr-2"
                />
                <label htmlFor="cod" className="text-gray-700">
                  Cash on Delivery (COD)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="CARD"
                  checked={paymentMethod === "CARD"}
                  onChange={() => setPaymentMethod("CARD")}
                  className="mr-2"
                />
                <label htmlFor="card" className="text-gray-700">
                  Pay with Card
                </label>
              </div>
            </div>

            {/* Stripe Card Element */}
            {paymentMethod === "CARD" && paymentConfig.publishableKey && (
              <div className="mt-4">
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: paymentConfig.clientSecret,
                    appearance: {
                      theme: "stripe",
                    },
                  }}
                >
                  <PaymentForm
                    totalPrice={totalPrice}
                    handleOrderSubmit={handleOrderSubmit}
                    processingPayment={processingPayment}
                    clientSecret={paymentConfig.clientSecret}
                  />
                </Elements>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <ShoppingCart className="mr-2 text-green-600" /> Order Summary
            </h3>
            {/* Order summary content remains the same */}
            {cart.map((item) => (
              <div
                key={item.plant_id}
                className="flex justify-between items-center border-b py-2"
              >
                <div className="flex items-center">
                  <img
                    src={`http://localhost:8000/api${item.image_url}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="flex justify-between mt-4 font-bold text-xl">
              <span>Total</span>
              <span>Rs. {totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Order Button (Only for COD) */}
          {paymentMethod === "COD" && (
            <div className="bg-white shadow-lg rounded-xl p-6">
              <button
                onClick={() => handleOrderSubmit()}
                disabled={processingPayment}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center disabled:bg-gray-400"
              >
                {processingPayment ? "Processing..." : "Complete Order"}
                <ChevronLeft className="ml-2 rotate-180" size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
