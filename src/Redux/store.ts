import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./slices/historySlice";

const store = configureStore({
    reducer: {
        history: historyReducer
    }
})

console.log("onCreateStore: ", store.getState());
store.subscribe(() => {
    console.log("Store change: ", JSON.stringify(store.getState()));
})

export default store; 