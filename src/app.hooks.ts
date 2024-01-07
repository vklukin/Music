import { useEffect } from "react";

import { useTheme } from "./core/hooks/useTheme";
import { localStorageKeys } from "./core/constants/localStorageKeys";
import { DARK_THEME, DEFAULT_THEME } from "./core/constants/theme";

const { theme: themeKey } = localStorageKeys;

export const useAppHooks = () => {
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        if (localStorage.getItem(themeKey)) return;

        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            setTheme(DARK_THEME);

            return;
        }

        localStorage.setItem(themeKey, DEFAULT_THEME);
    }, []);

    useEffect(() => {
        (document.querySelector("body") as HTMLBodyElement).dataset.theme =
            theme;
    }, [theme]);
};
