import { useEffect } from "react";

import "./styles/global.css";
import { localStorageKeys } from "./core/constants/localStorageKeys";
import { DEFAULT_THEME } from "./core/constants/theme";
import { useTheme } from "./core/hooks/useTheme";

import { Router } from "./router";

const { theme: themeKey } = localStorageKeys;

function App() {
    const { theme } = useTheme();

    useEffect(() => {
        if (!localStorage.getItem(themeKey)) {
            localStorage.setItem(themeKey, DEFAULT_THEME);
        }
    }, []);

    useEffect(() => {
        (document.querySelector("body") as HTMLBodyElement).dataset.theme =
            theme;
    }, [theme]);

    return <Router />;
}

export default App;
