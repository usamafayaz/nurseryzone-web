import React from "react";
import AppRouter from "./routes/AppRouter";
import { ToasterProvider } from "./components/Toaster";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISH_KEY);

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
