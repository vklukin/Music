import { Middleware } from "@reduxjs/toolkit";

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
    if (process.env.NODE_ENV === "development") {
        console.log(`Action: ${action}`);
        const result = next(action);
        console.log(`Next state: ${store.getState()}`);
        return result;
    }
};

export default loggerMiddleware;
