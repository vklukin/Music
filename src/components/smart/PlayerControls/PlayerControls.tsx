import classNames from "classnames/bind";

import styles from "./styles.module.css";
import { ReactComponent as TrackPrev } from "../../../assets/images/track-prev.svg";
import { ReactComponent as TrackNext } from "../../../assets/images/track-next.svg";
import { ReactComponent as Pause } from "../../../assets/images/pause.svg";
import { ReactComponent as Play } from "../../../assets/images/play.svg";
import { ReactComponent as TracksHistory } from "../../../assets/images/tracks-history.svg";
import { usePersistNavigate } from "../../../core/hooks/usePersistNavigate";

import { Button } from "../../ui/Button";

const cn = classNames.bind(styles);

export const PlayerControls = () => {
    const navigate = usePersistNavigate();

    const goToTracksHistory = () => {
        navigate("/history");
    };

    // TODO: добавить логику работы к кнопкам
    return (
        <div className={cn("controls-wrapper")}>
            <Button className={cn("button")} title="Назад [J]">
                <TrackPrev />
            </Button>
            <Button
                className={cn("button")}
                title={`${false ? "Играть" : "Пауза"} [K]`}
            >
                {false ? <Play /> : <Pause />}
            </Button>
            <Button className={cn("button")} title="Вперед [L]">
                <TrackNext />
            </Button>
            <Button
                className={cn("button")}
                title="История воспроизведения"
                onClick={goToTracksHistory}
            >
                <TracksHistory />
            </Button>
        </div>
    );
};
