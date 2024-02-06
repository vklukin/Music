import { createContext, useCallback, useMemo, useState } from "react";

import { ITrack } from "../../models/track";
import { usePlayerContextHooks } from "./PlayerContext.hooks";
import { localStorageKeys } from "../../constants/localStorageKeys";
import { trackAPI } from "../../api/track";

interface PlayerContextProps {
    volumeGain: number;
    currentDuration: number;
    isPlaying: boolean;
    currentTrack: ITrack | null;
    playMusic: () => void;
    pauseMusic: () => void;
    nextMusic: () => void;
    prevMusic: () => void;
    toggleMusic: () => void;
    toggleRandom: () => void;
}

export interface IPlayerInitialState {
    volumeGain: number;
    currentDuration: number;
    isPlaying: boolean;
    currentTrack: ITrack | null;
    isRandom: boolean;
}

const { currentTrack } = localStorageKeys;
const playerInitialState: IPlayerInitialState = {
    volumeGain: 1,
    currentDuration: 0,
    isPlaying: false,
    currentTrack: null,
    isRandom: false
};

const actx = new AudioContext();
const audioVolume = actx.createGain();
const audio = new Audio();
audio.crossOrigin = "anonymous";
const source = actx.createMediaElementSource(audio);

source.connect(audioVolume);
audioVolume.connect(actx.destination);

export const PlayerContext = createContext<PlayerContextProps | null>(null);
export const PlayerContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [playerState, setPlayerState] =
        useState<IPlayerInitialState>(playerInitialState);

    const setNewTrack = useCallback<(track: ITrack) => void>((track) => {
        audio.src = track.link;
        setPlayerState((prev) => ({ ...prev, currentTrack: track }));
        localStorage.setItem(currentTrack, JSON.stringify(track));
    }, []);

    const playMusic = useCallback(() => {
        if (actx.state === "suspended") actx.resume();
        audio.play();
        console.log(playerState.currentTrack);

        setPlayerState((prev) => ({ ...prev, isPlaying: true }));
    }, [playerState.currentTrack]);

    const pauseMusic = useCallback(() => {
        audio.pause();
        setPlayerState((prev) => ({ ...prev, isPlaying: false }));
    }, []);

    const toggleMusic = useCallback(() => {
        if (playerState.isPlaying) pauseMusic();
        else playMusic();
    }, [pauseMusic, playMusic, playerState.isPlaying]);

    const nextMusic = useCallback(async () => {
        setNewTrack(await trackAPI.getRandomTrack());
        playMusic();
    }, [playMusic, setNewTrack]);

    const prevMusic = useCallback(async () => {
        if (audio.currentTime > 5) {
            audio.currentTime = 0;
        } else {
            setNewTrack(await trackAPI.getPreviousTrack());
        }
        playMusic();
    }, [playMusic, setNewTrack]);

    const toggleRandom = useCallback(() => {
        setPlayerState((prev) => ({ ...prev, isRandom: !prev.isRandom }));
    }, []);

    usePlayerContextHooks({
        playerState,
        setPlayerState,
        setNewTrack
    });

    const value = useMemo(
        () => ({
            volumeGain: playerState.volumeGain,
            currentDuration: playerState.currentDuration,
            isPlaying: playerState.isPlaying,
            currentTrack: playerState.currentTrack,
            playMusic,
            pauseMusic,
            nextMusic,
            prevMusic,
            toggleMusic,
            toggleRandom
        }),
        [
            playerState.currentDuration,
            playerState.isPlaying,
            playerState.volumeGain,
            playerState.currentTrack,
            nextMusic,
            pauseMusic,
            playMusic,
            prevMusic,
            toggleMusic,
            toggleRandom
        ]
    );
    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
};
