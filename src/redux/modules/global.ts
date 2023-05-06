import { GlobalState } from "@/redux/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const globalState: GlobalState = {
    token: "",
    userInfo: "",
    unKeepAliveList: ['/login'],
    language: "",
    themeConfig: {
        primary: "#1890ff",
        isDark: false,
    }
};

const globalSlice = createSlice({
    name: "global",
    initialState: globalState,
    reducers: {
        setToken(state: GlobalState, { payload }: PayloadAction<string>) {
            state.token = payload;
        },
        setLanguage(state: GlobalState, { payload }: PayloadAction<string>) {
            state.language = payload;
        },
        setDark(state: GlobalState, { payload }: PayloadAction<boolean>) {
            state.themeConfig.isDark = payload;
        },
        changeUnKeepAliveList(state: GlobalState, { payload }: PayloadAction<string>) {
            if(state.unKeepAliveList.includes(payload)) {
                return
            }
            state.unKeepAliveList = state.unKeepAliveList.concat(payload)
        },
        removeUnKeepAlive(state: GlobalState, { payload }: PayloadAction<string>) {
            state.unKeepAliveList = state.unKeepAliveList.filter(item => item !== payload)
        },
        resetGlobalStore() {
            return globalState
        }
    },
});

export const { resetGlobalStore, setToken,setLanguage, setDark,changeUnKeepAliveList, removeUnKeepAlive } = globalSlice.actions;
export default globalSlice.reducer;
