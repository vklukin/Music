import { createContext, useCallback, useMemo } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { ITrack } from "../../models/track";
import { usePlayerContextHooks } from "./PlayerContext.hooks";
import { localStorageKeys } from "../../constants/localStorageKeys";
import { trackAPI } from "../../api/track";
import {
    audioAtom,
    currentTrackAtom,
    isRandomTrackAtom,
    isTrackPlayingAtom,
    trackCurrentDurationAtom
} from "../../atoms/Player";

interface PlayerContextProps {
    playMusic: () => void;
    pauseMusic: () => void;
    nextMusic: () => void;
    prevMusic: () => void;
    toggleMusic: () => void;
    toggleRandom: () => void;
}

const { currentTrack: currentTrackKey } = localStorageKeys;
let actx: AudioContext | null = null;

export const PlayerContext = createContext<PlayerContextProps | null>(null);
export const PlayerContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [isTrackPlaying, setIsTrackPlaying] = useAtom(isTrackPlayingAtom);
    const setCurrentTrack = useSetAtom(currentTrackAtom);
    const setCurrentDuration = useSetAtom(trackCurrentDurationAtom);
    const setIsRandomTrack = useSetAtom(isRandomTrackAtom);
    const audio = useAtomValue(audioAtom);

    const setNewTrack = useCallback<(track: ITrack) => void>(
        (track) => {
            audio.src = track.link;
            setCurrentTrack(track);
            setCurrentDuration(0);
            localStorage.setItem(currentTrackKey, JSON.stringify(track));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setCurrentDuration, setCurrentTrack]
    );

    const playMusic = useCallback(() => {
        if (!actx) {
            actx = new AudioContext();
            const audioVolume = actx.createGain();
            const source = actx.createMediaElementSource(audio);

            source.connect(audioVolume);
            audioVolume.connect(actx.destination);
            actx.resume();
        }
        if (actx.state === "suspended") actx.resume();
        setIsTrackPlaying(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const pauseMusic = useCallback(() => {
        setIsTrackPlaying(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleMusic = useCallback(() => {
        if (isTrackPlaying) pauseMusic();
        else playMusic();
    }, [isTrackPlaying, pauseMusic, playMusic]);

    const nextMusic = useCallback(async () => {
        setNewTrack(await trackAPI.getRandomTrack()); // TODO: переделать с рандомного трека на треки с плейлистом
        playMusic();
    }, [playMusic, setNewTrack]);

    const prevMusic = useCallback(async () => {
        if (audio.currentTime > 5) {
            audio.currentTime = 0;
        } else {
            setNewTrack(await trackAPI.getPreviousTrack());
        }
        playMusic();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playMusic, setNewTrack]);

    const toggleRandom = useCallback(() => {
        setIsRandomTrack((prev) => !prev);
    }, [setIsRandomTrack]);

    usePlayerContextHooks({
        setNewTrack,
        nextMusic,
        prevMusic,
        toggleMusic
    });

    const value = useMemo(
        () => ({
            playMusic,
            pauseMusic,
            nextMusic,
            prevMusic,
            toggleMusic,
            toggleRandom
        }),
        [nextMusic, pauseMusic, playMusic, prevMusic, toggleMusic, toggleRandom]
    );
    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
};
