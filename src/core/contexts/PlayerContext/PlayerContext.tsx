import { createContext, useMemo } from "react";

interface PlayerContextProps {}

export const PlayerContext = createContext<PlayerContextProps | null>(null);
export const PlayerContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const actx = useMemo(() => new AudioContext(), []);

    const value = useMemo(() => ({ actx }), [actx]);
    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
};
