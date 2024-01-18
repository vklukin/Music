import { createContext, useCallback, useMemo, useState } from "react";

interface PlayerContextProps {
    volumeGain: number;
    currentDuration: number;
    isPlaying: boolean;
    playMusic: () => void;
    pauseMusic: () => void;
    nextMusic: () => void;
    prevMusic: () => void;
    toggleMusic: () => void;
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
    const [playerState, setPlayerState] = useState({
        volumeGain: 1,
        currentDuration: 0,
        isPlaying: false
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

    const value = useMemo(
        () => ({
            volumeGain: playerState.volumeGain,
            currentDuration: playerState.currentDuration,
            isPlaying: playerState.isPlaying,
            playMusic,
            pauseMusic,
            nextMusic,
            prevMusic,
            toggleMusic
        }),
        [
            playerState.currentDuration,
            playerState.isPlaying,
            playerState.volumeGain,
            nextMusic,
            pauseMusic,
            playMusic,
            prevMusic,
            toggleMusic
        ]
    );
    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
};
