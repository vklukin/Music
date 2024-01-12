import classNames from "classnames/bind";

import styles from "./style.module.css";

import { Header } from "../../../components/smart/Header";
import { Player } from "../../../components/ordinary/Player";

interface RouterLayoutProps {
    children: React.ReactNode;
}

const cn = classNames.bind(styles);

export const RouterLayout: React.FC<RouterLayoutProps> = ({ children }) => {
    return (
        <div className={cn("layout-container")}>
            <Header />
            {children}
            <Player />
        </div>
    );
};
