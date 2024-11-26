// src/App.jsx
import React from "react";
import AppRouter from "./routes/AppRouter";
import { ToasterProvider } from "./components/Toaster";

const App = () => {
  return (
    <div>
      <ToasterProvider>
        <AppRouter />
      </ToasterProvider>
    </div>
  );
};

export default App;
