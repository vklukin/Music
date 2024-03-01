import { useAtomValue } from "jotai";

import { isTrackPlayingAtom } from "../../../../core/atoms/Player";
import { usePlayerContext } from "../../../../core/hooks/contexts/usePlayerContext";
import { ReactComponent as Pause } from "../../../../assets/images/pause.svg";
import { ReactComponent as Play } from "../../../../assets/images/play.svg";

import { Button } from "../../../ui/Button";

interface PlayAndPauseButtonProps {
    className?: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const PlayAndPauseButton: React.FC<PlayAndPauseButtonProps> = ({
    className,
    onClick
}) => {
    const isTrackPlaying = useAtomValue(isTrackPlayingAtom);
    const { toggleMusic } = usePlayerContext();

    function onButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        toggleMusic();
        onClick && onClick(e);
    }

    return (
        <Button
            className={className}
            title={`${isTrackPlaying ? "Пауза" : "Играть"} [K]`}
            onClick={onButtonClick}
        >
            {isTrackPlaying ? <Pause /> : <Play />}
        </Button>
    );
};
