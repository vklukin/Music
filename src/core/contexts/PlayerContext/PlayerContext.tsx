import { createContext, useCallback, useMemo } from "react";
import { useAtom, useSetAtom } from "jotai";

import { ITrack } from "../../models/track";
import { usePlayerContextHooks } from "./PlayerContext.hooks";
import { localStorageKeys } from "../../constants/localStorageKeys";
import { trackAPI } from "../../api/track";
import {
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
    const setCurrentTrack = useSetAtom(currentTrackAtom);
    const setCurrentDuration = useSetAtom(trackCurrentDurationAtom);
    const setIsRandomTrack = useSetAtom(isRandomTrackAtom);
    const [isTrackPlaying, setIsTrackPlaying] = useAtom(isTrackPlayingAtom);

    const setNewTrack = useCallback<(track: ITrack) => void>(
        (track) => {
            audio.src = track.link;
            setCurrentTrack(track);
            setCurrentDuration(0);
            localStorage.setItem(currentTrackKey, JSON.stringify(track));
        },
        [setCurrentDuration, setCurrentTrack]
    );

    const playMusic = useCallback(() => {
        if (actx.state === "suspended") actx.resume();
        audio.play();
        setIsTrackPlaying(true);
    }, [setIsTrackPlaying]);

    const pauseMusic = useCallback(() => {
        audio.pause();
        setIsTrackPlaying(false);
    }, [setIsTrackPlaying]);

    const toggleMusic = useCallback(() => {
        if (isTrackPlaying) pauseMusic();
        else playMusic();
    }, [isTrackPlaying, pauseMusic, playMusic]);

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
        setIsRandomTrack((prev) => !prev);
    }, [setIsRandomTrack]);

    usePlayerContextHooks({
        audio,
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
