import classNames from "classnames/bind";

import styles from "./style.module.css";
import { ReactComponent as VolumeSprite } from "../../../assets/images/volume-sprite.svg";
import { ReactComponent as Repeat } from "../../../assets/images/repeat.svg";
// import { ReactComponent as RepeatTrack } from "../../../assets/images/repeat-one-gold.svg";
import { ReactComponent as Shuffle } from "../../../assets/images/shuffle.svg";

import { Button } from "../../ui/Button";

const cn = classNames.bind(styles);

export const TrackSecondControls = () => {
    // TODO: доделать функционал
    return (
        <div className={cn("track-second-controls__wrapper")}>
            <Button className={cn("button")} title="В случайном порядке">
                <Shuffle />
            </Button>
            <Button className={cn("button")} title="Повторять">
                <Repeat />
            </Button>
            <Button
                className={cn("button")}
                title={false ? "Выключить звук [0]" : "Включить звук [0]"}
            >
                <div className={cn("svg-sprite")}>
                    <VolumeSprite />
                </div>
            </Button>
        </div>
    );
};
