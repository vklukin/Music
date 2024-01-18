import { useContext } from "react";

import { PlayerContext } from "../../../contexts/PlayerContext";

export const usePlayerContext = () => {
    const context = useContext(PlayerContext);

    if (!context) {
        throw new Error("Player context is null!");
    }

    return context;
};
