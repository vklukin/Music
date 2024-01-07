import { useEffect } from "react";

import { DARK_THEME, DEFAULT_THEME } from "../../constants/theme";
import { ThemeContextProps } from "./ThemeContext";
import { localStorageKeys } from "../../constants/localStorageKeys";

interface useThemeContextHooksProps {
    setTheme: ThemeContextProps["setTheme"];
}

const { theme } = localStorageKeys;

export const useThemeContextHooks = ({
    setTheme
}: useThemeContextHooksProps) => {
    useEffect(() => {
        if (localStorage.getItem(theme)) return;

        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            setTheme("dark");
            localStorage.setItem(theme, DARK_THEME);

            return;
        }

        localStorage.setItem(theme, DEFAULT_THEME);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
