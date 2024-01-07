import classnames from "classnames/bind";

import styles from "./style.module.css";

import { Logo } from "../../ui/Logo";

const cx = classnames.bind(styles);

export const Header = () => {
    return (
        <header className={cx("header")}>
            <Logo className={cx("logo")} />
        </header>
    );
};
