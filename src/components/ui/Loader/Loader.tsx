import classNames from "classnames/bind";

import styles from "./style.module.css";

interface LoaderProps {
    scale?: number;
}

const cx = classNames.bind(styles);

export const Loader: React.FC<LoaderProps> = ({ scale = 1 }) => {
    return (
        <span
            className={cx("loader")}
            style={{ transform: `scale(${scale})` }}
        ></span>
    );
};
