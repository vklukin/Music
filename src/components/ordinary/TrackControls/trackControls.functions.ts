import { useAtom } from "jotai";
import { trackAPI } from "../../../core/api/track";
import { useTheme } from "../../../core/hooks/contexts/useTheme";
import { messages } from "../../../core/utils/messages";
import { currentTrackAtom } from "../../../core/atoms/Player";

type TrackControlsFunctions = () => {
    onLikeButtonClick: () => Promise<void>;
    onIgnoreButtonClick: () => Promise<void>;
};

export const useTrackControlsFunctions: TrackControlsFunctions = () => {
    const { theme } = useTheme();
    const { error, success } = messages({ theme: theme });

    const [currentTrack, setCurrentTrack] = useAtom(currentTrackAtom);

    async function onLikeButtonClick() {
        try {
            const response = await trackAPI.likeForTrack(
                currentTrack?.id,
                currentTrack?.state.favourite ? "remove" : "add"
            );

            if (response.status.message === "added") {
                setCurrentTrack((prev) =>
                    prev
                        ? {
                              ...prev,
                              state: {
                                  ...prev.state,
                                  favourite: true
                              }
                          }
                        : null
                );
                success("Трек был добавлен в избранное");
            } else {
                setCurrentTrack((prev) =>
                    prev
                        ? {
                              ...prev,
                              state: {
                                  ...prev.state,
                                  favourite: false
                              }
                          }
                        : null
                );
                success("Трек был убран из избранного");
            }
        } catch (e) {
            if (typeof e === "string") {
                error(e);
            } else {
                console.error(e);
            }
        }
    }

    async function onIgnoreButtonClick() {
        try {
            const response = await trackAPI.ignoreForTrack(
                currentTrack?.id,
                currentTrack?.state.ignore ? "remove" : "add"
            );

            if (response.status.message === "added") {
                setCurrentTrack((prev) =>
                    prev
                        ? {
                              ...prev,
                              state: {
                                  ...prev.state,
                                  ignore: true
                              }
                          }
                        : null
                );
                success("Трек теперь игнорируется");
            } else {
                setCurrentTrack((prev) =>
                    prev
                        ? {
                              ...prev,
                              state: {
                                  ...prev.state,
                                  ignore: false
                              }
                          }
                        : null
                );
                success("Трек был убран из игнорирования");
            }
        } catch (e) {
            if (typeof e === "string") {
                error(e);
            } else {
                console.error(e);
            }
        }
    }

    return { onLikeButtonClick, onIgnoreButtonClick };
};
