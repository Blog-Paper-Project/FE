import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/* Styles settings */
import "./index.css";
import GlobalStyle from "./styles/GlobalStyle";

/* react-query */
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

/* Router settings */
import { BrowserRouter } from "react-router-dom";

/* Cookies settings */
import { CookiesProvider } from "react-cookie";

/* redux */
import store from "./redux/configStore";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyle />
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </CookiesProvider>
);
