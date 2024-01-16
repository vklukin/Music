import classNames from "classnames/bind";

import styles from "./style.module.css";
import { ReactComponent as HeartOutfill } from "../../../assets/images/heart-not-filled.svg";
// import { ReactComponent as HeartFilled } from "../../../assets/images/heart-full.svg";
import { ReactComponent as Plus } from "../../../assets/images/plus.svg";
import { ReactComponent as CircleCrossed } from "../../../assets/images/circle-crossed.svg";

import { Button } from "../../ui/Button";

const cn = classNames.bind(styles);

export const TrackControls = () => {
    // TODO: добавить функционал кнопкам
    return (
        <div className={cn("track-controls__wrapper")}>
            <Button
                className={cn("button")}
                title={false ? "Удалить из избранного" : "Добавить в избранное"}
            >
                <HeartOutfill />
            </Button>
            <Button className={cn("button")} title="Добавить в плейлист">
                <Plus />
            </Button>
            <Button
                className={cn("button")}
                title={false ? "Включить трек в поток" : "Игнорировать трек"}
            >
                <CircleCrossed />
            </Button>
        </div>
    );
};
