import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import menu from "./modules/menu";
import global from './modules/global'
import tabs from "@/redux/modules/tabs";

// create reducer
const reducer = combineReducers({
    menu,
    global,
    tabs
});


// redux middleWares
const middleWares = [reduxThunk, reduxPromise];

// redux persist
const persistConfig = {
    key: "redux-state",
    storage: storage
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

// store
export const store = configureStore({
    reducer: persistReducerConfig,
    middleware: middleWares,
    devTools: true
});

// create persist store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
