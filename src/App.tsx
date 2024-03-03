import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";

import { Router } from "./router";
import { RouterLayout } from "./core/layouts/RouterLayout";
import { PlayerContextProvider } from "./core/contexts/PlayerContext";

function App() {
    return (
        <PlayerContextProvider>
            <RouterLayout>
                <Router />
            </RouterLayout>
        </PlayerContextProvider>
    );
}

export default App;
