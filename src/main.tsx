import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { ThemeContextProvider } from "./core/contexts/ThemeContext";
import store from "./core/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
    <React.StrictMode>
        <ThemeContextProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeContextProvider>
    </React.StrictMode>
);
