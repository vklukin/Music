import { useAtom } from "jotai";
import classNames from "classnames/bind";

import styles from "./style.module.css";
import { ReactComponent as HeartOutfill } from "../../../assets/images/heart-not-filled.svg";
import { ReactComponent as HeartFilled } from "../../../assets/images/heart-full.svg";
import { ReactComponent as Plus } from "../../../assets/images/plus.svg";
import { ReactComponent as CircleCrossed } from "../../../assets/images/circle-crossed.svg";

import { currentTrackAtom } from "../../../core/atoms/Player";
import { trackAPI } from "../../../core/api/track";
import { messages } from "../../../core/utils/messages";
import { useTheme } from "../../../core/hooks/contexts/useTheme";

import { Button } from "../../ui/Button";

const cn = classNames.bind(styles);

export const TrackControls = () => {
    const [currentTrack, setCurrentTrack] = useAtom(currentTrackAtom);
    const { theme } = useTheme();
    const { error, success } = messages({ theme: theme });

    async function onLikeButtonClick() {
        try {
            const response = await trackAPI.likeForTrack(
                currentTrack?.id,
                currentTrack?.state.favourite ? "remove" : "add"
            );

            if (response.status.message === "added") {
                setCurrentTrack((prev) =>
                    prev
                        ? {
                              ...prev,
                              state: {
                                  ignore: prev?.state.ignore,
                                  favourite: true
                              }
                          }
                        : null
                );
                success("Трек был добавлен в избранное");
            } else {
                setCurrentTrack((prev) =>
                    prev
                        ? {
                              ...prev,
                              state: {
                                  ignore: prev?.state.ignore,
                                  favourite: false
                              }
                          }
                        : null
                );
                success("Трек был убран из избранного");
            }
        } catch (e) {
            if (typeof e === "string") {
                error(e);
            } else {
                console.error(e);
            }
        }
    }

    // TODO: добавить функционал кнопкам
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
