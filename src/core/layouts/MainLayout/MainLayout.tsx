import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import classNames from "classnames/bind";

import styles from "./style.module.css";

import { Header } from "../../../components/smart/Header";
import { Loader } from "../../../components/ui/Loader";

const cx = classNames.bind(styles);

export const MainLayout = () => {
    return (
        <>
            <Header />
            <Suspense
                fallback={
                    <div className={cx("loader-container")}>
                        <Loader scale={2} />
                    </div>
                }
            >
                <Outlet />
            </Suspense>
        </>
    );
};
