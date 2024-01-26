export interface ITrackAction {
    act: "add" | "remove";
}

export interface ITrackId {
    trackId: number;
}

export interface ITrack {
    id: number;
    authorName: string;
    trackName: string;
    duration: number;
    thumbnail: string;
    link: string;
}

export interface ITrackQueryParams {
    playlistId: number;
    currentTrackId?: number;
    nextTrackPosition: "prev" | "next" | "random";
}
