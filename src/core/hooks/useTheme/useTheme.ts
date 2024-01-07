import { useMemo, useState } from "react";

import { TTheme } from "../../types/theme";
import { localStorageKeys } from "../../constants/localStorageKeys";

type UseThemeFunc = () => {
    theme: TTheme;
    setTheme: React.Dispatch<React.SetStateAction<TTheme>>;
};

const { theme: themeKey } = localStorageKeys;

export const useTheme: UseThemeFunc = () => {
    const [theme, setTheme] = useState<TTheme>(
        () => (localStorage.getItem(themeKey) as TTheme) ?? "light"
    );

    return useMemo(
        () => ({
            theme,
            setTheme
        }),
        [theme]
    );
};
