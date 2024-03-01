import classNames from "classnames/bind";
import { useAtom, useAtomValue } from "jotai";

import { currentTrackAtom } from "../../../core/atoms/Player";
import styles from "./style.module.css";
import imageNotFound from "../../../assets/images/imageNotFound.png";
import { SetTimeOut } from "../../../core/utils/SetTimeOut";
import { isMouseEnterAtom } from "../../../core/atoms/TrackContent";

const cn = classNames.bind(styles);
const timeout = new SetTimeOut();

export const TrackContent = () => {
    const currentTrack = useAtomValue(currentTrackAtom);
    const [isMouseEnter, setIsMouseEnter] = useAtom(isMouseEnterAtom);

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
