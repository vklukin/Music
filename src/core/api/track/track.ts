import { api } from "../../configs/api";
import {
    ITrack,
    ITrackId,
    ITrackLikeAndIgnoreResponse
} from "../../models/track";
import { isApiError } from "../../utils/isApiError";

class Track {
    constructor() {}

    async getTrackInfoById(trackId: number): Promise<ITrack> {
        try {
            const response = await api.get<ITrack>(`/track/${trackId}/info`);
            return response.data;
        } catch (e) {
            if (isApiError(e)) {
                throw new Error(e.message);
            }
            throw new Error("Произошла ошибка при запросе данных трека");
        }
    }

    async getRandomTrackId(): Promise<number> {
        try {
            const {
                data: { trackId }
            } = await api.get<ITrackId>("/radio/mywave");

            return trackId;
        } catch (e) {
            if (isApiError(e)) {
                throw new Error(e.message);
            }
            throw new Error("Произошла ошибка при запросе случайного id трека");
        }
    }

    async getPreviousTrackId(): Promise<number> {
        try {
            const {
                data: { trackId }
            } = await api.get<ITrackId>("/previous-track");
            return trackId;
        } catch (e) {
            if (isApiError(e)) {
                throw new Error(e.message);
            }
            throw new Error(
                "Произошла ошибка при запросе id предыдущего трека"
            );
        }
    }

    async getRandomTrack(): Promise<ITrack> {
        try {
            const trackId = await this.getRandomTrackId();
            const response = await this.getTrackInfoById(trackId);
            return response;
        } catch (e) {
            if (isApiError(e)) {
                throw new Error(e.message);
            }
            throw new Error("Произошла ошибка при запросе случайного трека");
        }
    }

    async getPreviousTrack(): Promise<ITrack> {
        try {
            const trackId = await this.getPreviousTrackId();
            const response = await this.getTrackInfoById(trackId);
            return response;
        } catch (e) {
            if (isApiError(e)) {
                throw new Error(e.message);
            }
            throw new Error("Произошла ошибка при запросе предыдущего трека");
        }
    }

    async likeForTrack(
        trackId: number | null | undefined,
        actionType: "add" | "remove"
    ): Promise<ITrackLikeAndIgnoreResponse> {
        if (!trackId) {
            throw new Error("Не найден id трека");
        }

        try {
            const { data } = await api.post<ITrackLikeAndIgnoreResponse>(
                `/track/${trackId}/like/${actionType}`
            );
            return data;
        } catch (e) {
            if (isApiError(e)) {
                throw new Error(e.message);
            }
            throw new Error(
                "Произошла ошибка при запросе для избранности трека"
            );
        }
    }

    async ignoreForTrack(
        trackId: number | null | undefined,
        actionType: "add" | "remove"
    ): Promise<ITrackLikeAndIgnoreResponse> {
        if (!trackId) {
            throw new Error("Не найден id трека");
        }

        try {
            const { data } = await api.post<ITrackLikeAndIgnoreResponse>(
                `/track/${trackId}/ignore/${actionType}`
            );
            return data;
        } catch (e) {
            if (isApiError(e)) {
                throw new Error(e.message);
            }
            throw new Error("Произошла ошибка при для игнорирования трека");
        }
    }
}

export const trackAPI = new Track();
