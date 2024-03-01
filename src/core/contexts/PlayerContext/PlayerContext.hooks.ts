import { useEffect, useState } from "react";

import { TSetState } from "../../types/react";
import { IPlayerInitialState } from "./PlayerContext";
import { localStorageKeys } from "../../constants/localStorageKeys";
import { trackAPI } from "../../api/track";
import { ITrack } from "../../models/track";
import { messages } from "../../utils/messages";
import { isApiError } from "../../utils/isApiError";

interface usePlayerContextProps {
    audio: HTMLAudioElement;
    nextMusic: () => void;
    setPlayerState: TSetState<IPlayerInitialState>;
    setNewTrack: (track: ITrack) => void;
    prevMusic: () => Promise<void>;
    toggleMusic: () => void;
}

const { isRandom, volumeGain } = localStorageKeys;
const { error } = messages({});

export const usePlayerContextHooks = ({
    audio,
    setPlayerState,
    setNewTrack,
    nextMusic,
    prevMusic,
    toggleMusic
}: usePlayerContextProps) => {
    const [previousAudioTime, setPreviousAudioTime] = useState(0);

    async function apiQuery() {
        return await trackAPI.getRandomTrack();
    }

    useEffect(() => {
        audio.addEventListener("timeupdate", () => {
            if (Math.trunc(audio.currentTime) > previousAudioTime) {
                setPlayerState((prev) => ({
                    ...prev,
                    currentDuration: Math.trunc(audio.currentTime)
                }));
                setPreviousAudioTime(Math.trunc(audio.currentTime));
            }
        });
        audio.addEventListener("ended", nextMusic);
        window.addEventListener("keyup", (e) => {
            if (e.code === "KeyL") nextMusic();
            else if (e.code === "KeyK" || e.code === "Space") toggleMusic();
            else if (e.code === "KeyJ") prevMusic();
        });

        apiQuery()
            .then((data) => setNewTrack(data))
            .catch((e) => error(isApiError(e) ? e.message : e));

        setPlayerState((prev) => ({
            ...prev,
            isRandom:
                JSON.parse(localStorage.getItem(isRandom) as string) || false,
            volumeGain:
                JSON.parse(localStorage.getItem(volumeGain) as string) || 1
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
