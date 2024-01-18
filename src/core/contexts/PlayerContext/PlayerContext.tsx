import { createContext, useCallback, useMemo, useState } from "react";

import { ITrack } from "../../models/track";

interface PlayerContextProps {
    volumeGain: number;
    currentDuration: number;
    isPlaying: boolean;
    playMusic: () => void;
    pauseMusic: () => void;
    nextMusic: () => void;
    prevMusic: () => void;
    toggleMusic: () => void;
    toggleRandom: () => void;
}

interface IInitialState {
    volumeGain: number;
    currentDuration: number;
    isPlaying: boolean;
    currentTrack: ITrack | null;
    isRandom: boolean;
}

const actx = new AudioContext();
const audioVolume = actx.createGain();
const audio = new Audio();
const source = actx.createMediaElementSource(audio);

source.connect(audioVolume);
audioVolume.connect(actx.destination);

export const PlayerContext = createContext<PlayerContextProps | null>(null);
export const PlayerContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [playerState, setPlayerState] = useState<IInitialState>({
        volumeGain: 1,
        currentDuration: 0,
        isPlaying: false,
        currentTrack: null,
        isRandom: false
    });

    const playMusic = useCallback(() => {
        if (actx.state === "suspended") actx.resume();
        audio.play();
        setPlayerState((prev) => ({ ...prev, isPlaying: true }));
    }, []);

    const pauseMusic = useCallback(() => {
        audio.pause();
        setPlayerState((prev) => ({ ...prev, isPlaying: false }));
    }, []);

    const toggleMusic = useCallback(() => {
        if (playerState.isPlaying) pauseMusic();
        else playMusic();
    }, [pauseMusic, playMusic, playerState.isPlaying]);

    const nextMusic = useCallback(() => {
        // TODO: сделать функционал для получения музыки
        playMusic();
    }, [playMusic]);

    const prevMusic = useCallback(() => {
        // TODO: сделать функционал для получения музыки
        playMusic();
    }, [playMusic]);

    const toggleRandom = useCallback(() => {
        setPlayerState((prev) => ({ ...prev, isRandom: !prev.isRandom }));
    }, []);

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
