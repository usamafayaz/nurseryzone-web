import React from "react";
import AppRouter from "./routes/AppRouter";
import { ToasterProvider } from "./components/Toaster";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISH_KEY } from "./config/key";

const stripePromise = loadStripe(STRIPE_PUBLISH_KEY);

const App = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <ToasterProvider>
          <AppRouter />
        </ToasterProvider>
      </Elements>
    </div>
  );
};

export default App;
