import classNames from "classnames/bind";

import style from "./style.module.css";
import { useTheme } from "../../../core/hooks/contexts/useTheme";

interface ThemeSwitcherProps {
    className?: string;
}

const cx = classNames.bind(style);

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
    const { setTheme, theme } = useTheme();

    const handleSwitchTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button
            type="button"
            className={cx(
                { "dark-theme": theme === "dark" },
                "switch-button",
                className
            )}
            onClick={handleSwitchTheme}
        >
            <div></div>
        </button>
    );
};
