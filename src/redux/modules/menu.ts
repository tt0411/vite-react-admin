import { MenuState } from "@/redux/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const menuState: MenuState = {
	isCollapse: false,
	menuList: [],
	authRouter: [],
	authButtons: {}
};

const menuSlice = createSlice({
	name: "menu",
	initialState: menuState,
	reducers: {
		updateCollapse(state: MenuState, { payload }: PayloadAction<boolean>) {
			state.isCollapse = payload;
		},
		setMenuList(state: MenuState, { payload }: PayloadAction<Menu.MenuOptions[]>) {
			state.menuList = payload;
		},
		setAuthButtons(state: MenuState, { payload }: PayloadAction<{ [propName: string]: any }>) {
			state.authButtons = payload;
		},
		setAuthRouter(state: MenuState, { payload }: PayloadAction<string[]>) {
			state.authRouter = payload;
		}
	}
});

export default menuSlice.reducer;
export const { updateCollapse, setMenuList, setAuthButtons, setAuthRouter } = menuSlice.actions;
