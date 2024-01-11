import { combineReducers } from "@reduxjs/toolkit";

import player from "./slices/player";

const reducers = combineReducers({
    player
});

export default reducers;
