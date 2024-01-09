import "./styles/global.css";

import { Router } from "./router";
import { RouterLayout } from "./core/layouts/RouterLayout";

function App() {
    return (
        <RouterLayout>
            <Router />
        </RouterLayout>
    );
}

export default App;
