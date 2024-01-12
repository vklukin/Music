import { Link } from "react-router-dom";
import classnames from "classnames/bind";

import styles from "./style.module.css";
import { headerNavigation } from "../../../core/navigation/header";

import { Logo } from "../../ui/Logo";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { HeaderNavigationFeed } from "../../simple/HeaderNavigationFeed";

const cx = classnames.bind(styles);

export const Header = () => {
    return (
        <header className={cx("header")}>
            <div className={cx("haeder-kids")}>
                <Link to="/">
                    <Logo className={cx("logo")} />
                </Link>
                <HeaderNavigationFeed
                    linksClassname={cx("header-kids__links")}
                    navigation={headerNavigation}
                    className={cx("header-links-feed")}
                />
            </div>
            <ThemeSwitcher />
        </header>
    );
};
