import { useRef } from "react";
import classNames from "classnames/bind";

import styles from "./style.module.css";
import imageNotFound from "../../../assets/images/imageNotFound.png";
import { SetTimeOut } from "../../../core/utils/SetTimeOut";
import { usePlayerContext } from "../../../core/hooks/contexts/usePlayerContext";
import { TRACK_INFO_MAX_WIDTH } from "../../../core/constants/track";

const cn = classNames.bind(styles);
const timeout = new SetTimeOut();

export const TrackContent = () => {
    const { currentTrack } = usePlayerContext();

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // TODO: переделать на animation
    function onMouseOver() {
        if (!wrapperRef.current) return;
        wrapperRef.current.setAttribute(
            "style",
            "--track-info-container-width: 100%"
        );
    }
    function onMouseNotOver() {
        timeout._timeout && timeout.stop();

        if (!wrapperRef.current) return;
        wrapperRef.current.setAttribute(
            "style",
            `--track-info-container-width: ${TRACK_INFO_MAX_WIDTH}`
        );
    }

    return (
        <div
            className={cn("track-content__wrapper")}
            onMouseEnter={() => timeout.start(onMouseOver, 1000)}
            onMouseLeave={onMouseNotOver}
            ref={wrapperRef}
        >
            <img
                src={currentTrack?.thumbnail || imageNotFound}
                alt="Изображение трека"
            />
            <div className={cn("track-content__info")}>
                <a href="#" className={cn("info__track-name")}>
                    {currentTrack?.trackName ?? "Название трека не найдено"}
                </a>
                <a href="#" className={cn("info__author-name")}>
                    {currentTrack?.authorName ?? "Исполнитель не найден"}
                </a>
            </div>
        </div>
    );
};
