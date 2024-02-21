import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import classNames from "classnames/bind";

import styles from "./style.module.css";
import { messages } from "../../utils/messages";

import { Loader } from "../../../components/ui/Loader";

const cx = classNames.bind(styles);
const { MessageContainer } = messages({});

export const MainLayout = () => {
    return (
        <div className={cx("layout-container")}>
            <MessageContainer />
            <Suspense
                fallback={
                    <div className={cx("loader-container")}>
                        <Loader scale={2} />
                    </div>
                }
            >
                <Outlet />
            </Suspense>
        </div>
    );
};
