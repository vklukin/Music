import axios from "axios";

import { API_URL } from "../../constants/api";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: ["application/json", "audio/mpeg"],
        "Content-Type": "application/json"
    },
    responseType: "json"
});
