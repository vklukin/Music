import classNames from "classnames/bind";

import styles from "./styles.module.css";

const cn = classNames.bind(styles);

export const Player = () => {
    return <div className={cn("player")}></div>;
};
