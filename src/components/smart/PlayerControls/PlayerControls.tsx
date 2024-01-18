import classNames from "classnames/bind";

import styles from "./styles.module.css";

import { PlayAndPauseButton } from "../PlayerControlButtons/PlayAndPauseButton";
import { TrackPrevButton } from "../PlayerControlButtons/TrackPrevButton";
import { TrackNextButton } from "../PlayerControlButtons/TrackNextButton";
import { GoToHistoryButton } from "../PlayerControlButtons/GoToHistoryButton";

const cn = classNames.bind(styles);

export const PlayerControls = () => {
    return (
        <div className={cn("controls-wrapper")}>
            <TrackPrevButton className={cn("button")} />
            <PlayAndPauseButton className={cn("button")} />
            <TrackNextButton className={cn("button")} />
            <GoToHistoryButton className={cn("button")} />
        </div>
    );
};
