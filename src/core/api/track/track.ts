import { api } from "../../configs/api";
import { ITrack, ITrackId } from "../../models/track";
import { isApiError } from "../../utils/isApiError";

class Track {
    constructor() {}

    async getTrackById(trackId: number): Promise<ITrack> {
        try {
            const response = await api.get<ITrack>(`/track/${trackId}`);
            return response.data;
        } catch (e) {
            if (isApiError(e)) {
                throw new Error(e.message);
            }
            throw new Error("Произошла ошибка при запросе id трека");
        }
    }

    async getRandomTrack(): Promise<ITrack> {
        try {
            const {
                data: { trackId }
            } = await api.get<ITrackId>("/radio/mywave");
            const response = await this.getTrackById(trackId);
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
