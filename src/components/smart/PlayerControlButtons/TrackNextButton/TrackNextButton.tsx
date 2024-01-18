import { ReactComponent as TrackNext } from "../../../../assets/images/track-next.svg";
import { usePlayerContext } from "../../../../core/hooks/contexts/usePlayerContext";

import { Button } from "../../../ui/Button";

interface TrackNextButtonProps {
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const TrackNextButton: React.FC<TrackNextButtonProps> = ({
    className,
    onClick
}) => {
    const { prevMusic } = usePlayerContext();
    const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        prevMusic();
        onClick && onClick(e);
    };

    return (
        <Button
            className={className}
            title="Вперед [L]"
            onClick={onButtonClick}
        >
            <TrackNext />
        </Button>
    );
};
