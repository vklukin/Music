import "./styles/global.css";

import { Router } from "./router";
import { useAppHooks } from "./app.hooks";

function App() {
    useAppHooks();

    return <Router />;
}

export default App;
