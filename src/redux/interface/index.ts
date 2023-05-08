
/* themeConfigProp */
export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
}

/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: any;
	unKeepAliveList: string[];
	language: string;
	themeConfig: ThemeConfigProp;
}

/* MenuState */
export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[]
	authButtons: {
		[propName: string]: any;
	};
	authRouter: string[];
}

/* TabsState */
export interface TabsState {
	tabsActive: string;
	tabsList: Menu.MenuOptions[];
	isShow: boolean;
}

/* BreadcrumbState */
export interface BreadcrumbState {
	breadcrumbList: {
		[propName: string]: any;
	};
}

