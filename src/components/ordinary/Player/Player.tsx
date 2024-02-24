import classNames from "classnames/bind";

import styles from "./styles.module.css";

import { PlayerControls } from "../../smart/PlayerControls";
import { TrackContent } from "../TrackContent";
import { TrackControls } from "../TrackControls";
import { TrackSecondControls } from "../../smart/TrackSecondControls";
import { TrackProgress } from "../../smart/TrackProgress";

const cn = classNames.bind(styles);

export const Player = () => {
    return (
        <div className={cn("player")}>
            <TrackProgress />
            <PlayerControls />
            <div className={cn("player-content")}>
                <TrackContent />
                <TrackControls />
            </div>
            <TrackSecondControls />
        </div>
    );
};
