import { ReactComponent as TrackPrev } from "../../../../assets/images/track-prev.svg";
import { usePlayerContext } from "../../../../core/hooks/contexts/usePlayerContext";

import { Button } from "../../../ui/Button";

interface TrackPrevButtonProps {
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const TrackPrevButton: React.FC<TrackPrevButtonProps> = ({
    className,
    onClick
}) => {
    const { prevMusic } = usePlayerContext();
    const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        prevMusic();
        onClick && onClick(e);
    };

    return (
        <Button className={className} title="Назад [J]" onClick={onButtonClick}>
            <TrackPrev />
        </Button>
    );
};
