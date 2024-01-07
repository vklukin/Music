import { useCallback, useMemo, useState } from "react";

import { TTheme } from "../../types/theme";
import { localStorageKeys } from "../../constants/localStorageKeys";

type UseThemeFunc = () => {
    theme: TTheme;
    setTheme: (newTheme: TTheme) => void;
};

const { theme: themeKey } = localStorageKeys;

export const useTheme: UseThemeFunc = () => {
    const [theme, setTheme] = useState<TTheme>(
        () => (localStorage.getItem(themeKey) as TTheme) ?? "light"
    );

    const setNewTheme = useCallback<(newTheme: TTheme) => void>((newTheme) => {
        setTheme(newTheme);
        (document.querySelector("body") as HTMLBodyElement).dataset.theme =
            newTheme;
        localStorage.setItem(themeKey, newTheme);
    }, []);

    return useMemo(
        () => ({
            theme,
            setTheme: setNewTheme
        }),
        [setNewTheme, theme]
    );
};
