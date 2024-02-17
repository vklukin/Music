import { useState } from "react";
import classNames from "classnames/bind";

import styles from "./style.module.css";
import imageNotFound from "../../../assets/images/imageNotFound.png";
import { usePlayerContext } from "../../../core/hooks/contexts/usePlayerContext";
import { SetTimeOut } from "../../../core/utils/SetTimeOut";

const cn = classNames.bind(styles);
const timeout = new SetTimeOut();

export const TrackContent = () => {
    const { currentTrack } = usePlayerContext();

    const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);

    function onMouseEnter() {
        timeout.start(() => {
            setIsMouseEnter(true);
        }, 700);
    }

    function onMouseLeave() {
        if (timeout._timeout) timeout.stop();

        timeout.start(() => {
            setIsMouseEnter(false);
        }, 700);
    }

    return (
        <div className={cn("track-content__wrapper")}>
            <img
                src={currentTrack?.thumbnail || imageNotFound}
                alt="Изображение трека"
            />
            <div
                className={cn("track-content__info", {
                    "track-content__hover": isMouseEnter
                })}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <a href="#" className={cn("info__track-name", "track-info")}>
                    {currentTrack?.trackName ?? "Название трека не найдено"}
                </a>
                <a href="#" className={cn("info__author-name", "track-info")}>
                    {currentTrack?.authorName ?? "Исполнитель не найден"}
                </a>
            </div>
        </div>
    );
};
