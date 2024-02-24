import { useState } from "react";
import classNames from "classnames/bind";

import styles from "./style.module.css";
import { usePlayerContext } from "../../../core/hooks/contexts/usePlayerContext";
import { secondsToTime } from "../../../core/utils/secondsToTime";

const cn = classNames.bind(styles);

export const TrackProgress = () => {
    const { currentDuration, currentTrack } = usePlayerContext();

    const [showTime, setShowTime] = useState(false);

    return (
        <div
            className={cn("track-progress")}
            onMouseEnter={() => setShowTime(true)}
            onMouseLeave={() => setShowTime(false)}
        >
            {showTime && (
                <div className={cn("time-wrapper")}>
                    <p>{secondsToTime(currentDuration)}</p>
                    <p>{secondsToTime(currentTrack?.duration)}</p>
                </div>
            )}
        </div>
    );
};
