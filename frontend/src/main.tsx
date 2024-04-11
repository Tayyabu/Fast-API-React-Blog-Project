import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import { StoreProvider } from "easy-peasy";
import "./css/index.css";
import { BrowserRouter } from "react-router-dom";
import Store from "./context/Store.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider store={Store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <App />
           
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </StoreProvider>
  </React.StrictMode>
);
