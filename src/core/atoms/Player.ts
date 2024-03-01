import { atom } from "jotai";

import { ITrack } from "../models/track";

export const trackVolumeGainAtom = atom<number>(1);

export const trackCurrentDurationAtom = atom<number>(0);

export const isTrackPlayingAtom = atom<boolean>(false);

export const isRandomTrackAtom = atom<boolean>(false);

export const currentTrackAtom = atom<ITrack | null>(null);

export const previousAudioTimeAtom = atom<number>(0);

export const audioAtom = atom<HTMLAudioElement>(new Audio());