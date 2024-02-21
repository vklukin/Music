import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";

import App from "./App";
import { ThemeContextProvider } from "./core/contexts/ThemeContext";
import { queryClient } from "./core/configs/QueryClient";

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
    <BrowserRouter>
        <ThemeContextProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </ThemeContextProvider>
    </BrowserRouter>
);
