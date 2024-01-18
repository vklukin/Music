import { createContext, useCallback, useMemo, useState } from "react";

interface PlayerContextProps {
    startMusic: () => void;
    pauseMusic: () => void;
    nextMusic: () => void;
    prevMusic: () => void;
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
    const [currentDuration, setCurrentDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const startMusic = useCallback(() => {
        if (actx.state === "suspended") actx.resume();
        audio.play();
        setIsPlaying(true);
    }, []);

    const pauseMusic = useCallback(() => {
        audio.pause();
        setIsPlaying(false);
    }, []);

    const nextMusic = useCallback(() => {
        // TODO: сделать функционал для получения музыки
        startMusic();
    }, [startMusic]);

    const prevMusic = useCallback(() => {
        // TODO: сделать функционал для получения музыки
        startMusic();
    }, [startMusic]);

    const value = useMemo(
        () => ({
            volumeGain,
            setVolumeGain,
            currentDuration,
            setCurrentDuration,
            startMusic,
            pauseMusic,
            nextMusic,
            prevMusic,
            isPlaying
        }),
        [
            currentDuration,
            isPlaying,
            nextMusic,
            pauseMusic,
            prevMusic,
            startMusic,
            volumeGain
        ]
    );
    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
};
