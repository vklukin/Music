import { useAtomValue } from "jotai";
import classNames from "classnames/bind";

import styles from "./style.module.css";
import { ReactComponent as HeartOutfill } from "../../../assets/images/heart-not-filled.svg";
import { ReactComponent as HeartFilled } from "../../../assets/images/heart-full.svg";
import { ReactComponent as Plus } from "../../../assets/images/plus.svg";
import { ReactComponent as CircleCrossed } from "../../../assets/images/circle-crossed.svg";

import { currentTrackAtom } from "../../../core/atoms/Player";
import { useTrackControlsFunctions } from "./trackControls.functions";

import { Button } from "../../ui/Button";

const cn = classNames.bind(styles);

export const TrackControls = () => {
    const currentTrack = useAtomValue(currentTrackAtom);
    const { onIgnoreButtonClick, onLikeButtonClick } =
        useTrackControlsFunctions();

    // TODO: доделать кнопку добавления в плейлисты
    return (
        <div className={cn("track-controls__wrapper")}>
            <Button
                onClick={onLikeButtonClick}
                className={cn("button")}
                title={
                    currentTrack?.state.favourite ?? false
                        ? "Удалить из избранного"
                        : "Добавить в избранное"
                }
            >
                {currentTrack?.state.favourite ?? false ? (
                    <HeartFilled />
                ) : (
                    <HeartOutfill />
                )}
            </Button>
            <Button className={cn("button")} title="Добавить в плейлист">
                <Plus />
            </Button>
            <Button
                onClick={onIgnoreButtonClick}
                className={cn("button", {
                    ingored: currentTrack?.state.ignore ?? false
                })}
                title={
                    currentTrack?.state.ignore ?? false
                        ? "Включить трек в поток"
                        : "Игнорировать трек"
                }
            >
                <CircleCrossed />
            </Button>
        </div>
    );
};
