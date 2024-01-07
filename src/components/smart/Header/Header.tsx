import classnames from "classnames/bind";

import styles from "./style.module.css";

import { Logo } from "../../ui/Logo";
import { ThemeSwitcher } from "../ThemeSwitcher";

const cx = classnames.bind(styles);

export const Header = () => {
    return (
        <header className={cx("header")}>
            <Logo className={cx("logo")} />
            <ThemeSwitcher />
        </header>
    );
};
