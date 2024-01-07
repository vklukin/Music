import { Route, Routes } from "react-router-dom";

import { MainLazy } from "../pages/Main";

export function Router() {
    return <Routes>
        <Route>
            <Route path="/" element={<MainLazy />} />
        </Route>
    </Routes>;
}

