import classNames from "classnames/bind";

import styles from "./styles.module.css";

import { PlayerControls } from "../../smart/PlayerControls";
import { TrackContent } from "../TrackContent";
import { TrackControls } from "../TrackControls";

const cn = classNames.bind(styles);

export const Player = () => {
    return (
        <div className={cn("player")}>
            <PlayerControls />
            <div className={cn("player-content")}>
                <TrackContent />
                <TrackControls />
            </div>
        </div>
    );
};
