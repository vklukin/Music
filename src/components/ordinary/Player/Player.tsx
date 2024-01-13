import classNames from "classnames/bind";

import styles from "./styles.module.css";

import { PlayerControls } from "../../smart/PlayerControls";

const cn = classNames.bind(styles);

export const Player = () => {
    return (
        <div className={cn("player")}>
            <PlayerControls />
        </div>
    );
};
