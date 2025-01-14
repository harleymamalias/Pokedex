import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokedexProvider } from "./context/PokedexAppContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <PokedexProvider>
      <App />
    </PokedexProvider>
  </QueryClientProvider>
);
