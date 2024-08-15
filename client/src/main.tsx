import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { DependencyProvider } from "./context/dependencyContext.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/auth/sign-in"
        signInUrl="/auth/sign-in"
        signUpUrl="/auth/sign-up"
        signInFallbackRedirectUrl={"/student"}
        signUpFallbackRedirectUrl={"/createUser"}
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#3371FF",
            colorBackground: "#09111f",
          },
        }}
      >
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
);
