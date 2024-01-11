import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./core/store";

import App from "./App";
import { ThemeContextProvider } from "./core/contexts/ThemeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeContextProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </ThemeContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
