import {TabsState} from "@/redux/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const tabsState: TabsState = {
    tabsActive: '/home',
    tabsList: [{ title: "首页", path: '/home' }],
};

const tabsSlice = createSlice({
    name: "tabs",
    initialState: tabsState,
    reducers: {
        setTabsActive(state: TabsState, { payload }: PayloadAction<string>) {
            state.tabsActive = payload;
        },
        setTabsList(state: TabsState, { payload }: PayloadAction<Menu.MenuOptions[]>) {
            state.tabsList = payload;
        },
        resetTabsStore() {
            return tabsState
        }
    }
});

export default tabsSlice.reducer;
export const { resetTabsStore, setTabsActive, setTabsList } = tabsSlice.actions;
