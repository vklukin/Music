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
    const { isPlaying, toggleMusic } = usePlayerContext();

    function onButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        toggleMusic();
        onClick && onClick(e);
    }

    return (
        <Button
            className={className}
            title={`${isPlaying ? "Пауза" : "Играть"} [K]`}
            onClick={onButtonClick}
        >
            {isPlaying ? <Pause /> : <Play />}
        </Button>
    );
};
