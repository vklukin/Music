import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

import { TTheme } from "../../types/theme";
import { localStorageKeys } from "../../constants/localStorageKeys";
import { useThemeContextHooks } from "./ThemeContext.hooks";

export interface ThemeContextProps {
    theme: TTheme;
    setTheme: (newTheme: TTheme) => void;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);

const { theme: themeKey } = localStorageKeys;

export const ThemeContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [theme, setTheme] = useState<TTheme>(
        () => (localStorage.getItem(themeKey) as TTheme) ?? "light"
    );

    useThemeContextHooks({ setTheme });

    useEffect(() => {
        (document.querySelector("body") as HTMLBodyElement).dataset.theme =
            theme;
    }, [theme]);

    const setNewTheme = useCallback<ThemeContextProps["setTheme"]>(
        (newTheme) => {
            setTheme(newTheme);
            (document.querySelector("body") as HTMLBodyElement).dataset.theme =
                newTheme;
            localStorage.setItem(themeKey, newTheme);
        },
        []
    );

    const value = useMemo(
        () => ({ theme, setTheme: setNewTheme }),
        [setNewTheme, theme]
    );
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};
