import { useEffect } from "react";

import { TSetState } from "../../types/react";
import { IPlayerInitialState } from "./PlayerContext";
import { localStorageKeys } from "../../constants/localStorageKeys";
import { trackAPI } from "../../api/track";
import { ITrack } from "../../models/track";

interface usePlayerContextProps {
    playerState: IPlayerInitialState;
    setPlayerState: TSetState<IPlayerInitialState>;
    setNewTrack: (track: ITrack) => void;
}

const { isRandom, currentTrack, volumeGain } = localStorageKeys;

export const usePlayerContextHooks = ({
    playerState,
    setPlayerState,
    setNewTrack
}: usePlayerContextProps) => {
    async function apiQuery() {
        return await trackAPI.getRandomTrack();
    }

    useEffect(() => {
        if (!localStorage.getItem(isRandom)) {
            localStorage.setItem(isRandom, JSON.stringify(false));
        }
        if (!localStorage.getItem(currentTrack)) {
            localStorage.setItem(currentTrack, JSON.stringify(null));
        }
        if (!localStorage.getItem(volumeGain)) {
            localStorage.setItem(volumeGain, JSON.stringify(1));
        }

        if (!playerState.currentTrack) {
            apiQuery().then((data) => setNewTrack(data));
            // TODO: добавить вывод ошибки на всплывающее окно
        }

        setPlayerState((prev) => ({
            ...prev,
            isRandom: JSON.parse(localStorage.getItem(isRandom) as string),
            volumeGain: JSON.parse(localStorage.getItem(volumeGain) as string),
            currentTrack: JSON.parse(
                localStorage.getItem(currentTrack) as string
            )
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
