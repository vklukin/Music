import { api } from "../../configs/api";
import { ITrack, ITrackId } from "../../models/track";
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
}

export const trackAPI = new Track();
