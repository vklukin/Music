import { Route, Routes } from "react-router-dom";

import { MainLazy } from "../pages/Main";
import { MainLayout } from "../core/layouts/MainLayout";

export function Router() {
    return <Routes>
        <Route element={<MainLayout />}>
            <Route path="/" element={<MainLazy />} />
        </Route>
    </Routes>;
}

