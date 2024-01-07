import classNames from "classnames/bind";

import {ReactComponent as LogoImage} from "../../../assets/images/Logo.svg";
import styles from "./style.module.css";

interface LogoProps {
    width?: string;
    height?: string;
    className?: string;
}

const cx = classNames.bind(styles);

export const Logo: React.FC<LogoProps> = ({ className, height, width }) => {
    return (
        <LogoImage
            style={{ width, height }}
            className={cx("logo-icon", className)}
        />
    );
};
