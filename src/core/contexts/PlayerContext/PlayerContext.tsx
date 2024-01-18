import { createContext, useCallback, useMemo, useState } from "react";

import { TSetState } from "../../types/react";

interface PlayerContextProps {
    volumeGain: number;
    currentDuration: number;
    isPlaying: boolean;
    setVolumeGain: TSetState<number>;
    setCurrentDuration: TSetState<number>;
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
    const [volumeGain, setVolumeGain] = useState<number>(1);
    const [currentDuration, setCurrentDuration] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const playMusic = useCallback(() => {
        if (actx.state === "suspended") actx.resume();
        audio.play();
        setIsPlaying(true);
    }, []);

    const pauseMusic = useCallback(() => {
        audio.pause();
        setIsPlaying(false);
    }, []);

    const toggleMusic = useCallback(() => {
        if (isPlaying) pauseMusic();
        else playMusic();
    }, [isPlaying, pauseMusic, playMusic]);

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
            volumeGain,
            currentDuration,
            isPlaying,
            setVolumeGain,
            setCurrentDuration,
            playMusic,
            pauseMusic,
            nextMusic,
            prevMusic,
            toggleMusic
        }),
        [
            volumeGain,
            currentDuration,
            isPlaying,
            playMusic,
            pauseMusic,
            nextMusic,
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
