import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";

import { localStorageKeys } from "../../constants/localStorageKeys";
import { trackAPI } from "../../api/track";
import { ITrack } from "../../models/track";
import { messages } from "../../utils/messages";
import { isApiError } from "../../utils/isApiError";
import {
    isRandomTrackAtom,
    previousAudioTimeAtom,
    trackCurrentDurationAtom,
    trackVolumeGainAtom
} from "../../atoms/Player";

interface usePlayerContextProps {
    audio: HTMLAudioElement;
    nextMusic: () => void;
    setNewTrack: (track: ITrack) => void;
    prevMusic: () => Promise<void>;
    toggleMusic: () => void;
}

const { isRandom, volumeGain } = localStorageKeys;
const { error } = messages({});

export const usePlayerContextHooks = ({
    audio,
    setNewTrack,
    nextMusic,
    prevMusic,
    toggleMusic
}: usePlayerContextProps) => {
    const [previousAudioTime, setPreviousAudioTime] = useAtom(
        previousAudioTimeAtom
    );
    const setCurrentDuration = useSetAtom(trackCurrentDurationAtom);
    const setIsRandomTrack = useSetAtom(isRandomTrackAtom);
    const setVolumeGain = useSetAtom(trackVolumeGainAtom);

    async function apiQuery() {
        return await trackAPI.getRandomTrack();
    }

    useEffect(() => {
        audio.addEventListener("timeupdate", () => {
            if (Math.trunc(audio.currentTime) > previousAudioTime) {
                setCurrentDuration(Math.trunc(audio.currentTime));
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

        setVolumeGain(JSON.parse(localStorage.getItem(volumeGain) as string) || 1)
        setIsRandomTrack(JSON.parse(localStorage.getItem(isRandom) as string) || false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
