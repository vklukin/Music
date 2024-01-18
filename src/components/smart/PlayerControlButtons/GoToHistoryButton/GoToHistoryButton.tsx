import { Button } from "../../../ui/Button";

import { ReactComponent as TracksHistory } from "../../../../assets/images/tracks-history.svg";
import { usePersistNavigate } from "../../../../core/hooks/usePersistNavigate";

interface GoToHistoryButtonProps {
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const GoToHistoryButton: React.FC<GoToHistoryButtonProps> = ({
    className,
    onClick
}) => {
    const navigate = usePersistNavigate();

    const goToTracksHistory = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        onClick && onClick(e);
        navigate("/history");
    };

    return (
        <Button
            className={className}
            title="История воспроизведения"
            onClick={goToTracksHistory}
        >
            <TracksHistory />
        </Button>
    );
};
