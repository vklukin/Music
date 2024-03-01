import { useState } from "react";
import classNames from "classnames/bind";
import { useAtomValue } from "jotai";

import {
    currentTrackAtom,
    trackCurrentDurationAtom
} from "../../../core/atoms/Player";
import styles from "./style.module.css";
import { secondsToTime } from "../../../core/utils/secondsToTime";

const cn = classNames.bind(styles);

export const TrackProgress = () => {
    const currentDuration = useAtomValue(trackCurrentDurationAtom);
    const currentTrack = useAtomValue(currentTrackAtom);

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
