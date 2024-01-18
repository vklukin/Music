import { useRef } from "react";
import classNames from "classnames/bind";

import styles from "./style.module.css";
import imageNotFound from "../../../assets/images/imageNotFound.png";
import { SetTimeOut } from "../../../core/utils/SetTimeOut";

const cn = classNames.bind(styles);
const timeout = new SetTimeOut();

export const TrackContent = () => {
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
            "--track-info-container-width: 15rem"
        );
    }

    // TODO: добавить функциональность
    return (
        <div
            className={cn("track-content__wrapper")}
            onMouseEnter={() => timeout.start(onMouseOver, 1000)}
            onMouseLeave={onMouseNotOver}
            ref={wrapperRef}
        >
            <img src={imageNotFound} alt="Изображение трека" />
            <div className={cn("track-content__info")}>
                <a href="#" className={cn("info__track-name")}>
                    testtesttesttesttesttesttesttesttesttesttesttesttesttest
                </a>
                <a href="#" className={cn("info__author-name")}>
                    testtest
                </a>
            </div>
        </div>
    );
};
