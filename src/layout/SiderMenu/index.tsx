import React, {FC, useEffect, useState} from "react";
import {Menu, MenuProps, Spin} from 'antd'
import {RootState, useDispatch, useSelector} from "@/redux";
import {setAuthRouter, updateCollapse, setMenuList as reduxSetMenuList} from "@/redux/modules/menu";
import {useLocation, useNavigate} from "react-router-dom";
import {findAllBreadcrumb, getOpenKeys, handleRouter, searchRoute} from "@/utils";
import {RouteObject} from "@/routers/interface";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import IconComp from "@/common/IconComp";
import {routeModel} from "../../../mock/menu";

const SiderMenu: FC = () => {
    const dispatch = useDispatch();
    const {isCollapse, menuList: reduxMenuList} = useSelector((state: RootState) => state.menu);
    const {pathname} = useLocation();
    const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [menuList, setMenuList] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState<boolean>(false)


    // 定义 menu 类型
    type MenuItem = Required<MenuProps>["items"][number];
    const getItem = (
        label: React.ReactNode,
        key?: React.Key | null,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: "group"
    ): MenuItem => {
        return {
            key,
            icon,
            children,
            label,
            type
        } as MenuItem;
    };

    // 刷新页面菜单保持高亮
    useEffect(() => {
        setSelectedKeys([pathname]);
        !isCollapse && setOpenKeys(getOpenKeys(pathname));
    }, [pathname, isCollapse])

    const deepLoopFloat = (menuList: RouteObject[], newArr: MenuItem[] = []) => {
        menuList.forEach((item: RouteObject) => {
            // 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
            if (!item?.children?.length) { // @ts-ignore
                return newArr.push(getItem(item.meta.title, item.path, <IconComp icon={item.meta.icon} />))
            }
            // @ts-ignore
            newArr.push(getItem(item.meta.title, item.path, <IconComp icon={item.meta.icon}/>, deepLoopFloat(item.children)));
        });
        return newArr;
    };

    const getMenuData = async () => {
        setLoading(true);
        try {
            // const { data } = await getMenuList();
            // if (!data) return;
            const data = routeModel
            setMenuList(deepLoopFloat(data));
            // 存储处理过后的所有面包屑导航栏到 redux 中
           // dispatch(setBreadcrumbList(findAllBreadcrumb(data)));
            // 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
            const dynamicRouter = handleRouter(data);
            dispatch(setAuthRouter(dynamicRouter));
            dispatch(reduxSetMenuList(data));
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getMenuData();
    }, []);

    // 设置当前展开的 subMenu
    const onOpenChange = (openKeys: string[]) => {
        if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
        const latestOpenKey = openKeys[openKeys.length - 1];
        if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
        setOpenKeys([latestOpenKey]);
    };

    // 点击当前菜单跳转页面
    const navigate = useNavigate();

    const clickMenu: MenuProps["onClick"] = ({key}: { key: string }) => {
        const route = searchRoute(key, reduxMenuList);
        if (route.isLink) window.open(route.isLink, "_blank");
        navigate(key);
    };

    const toggleCollapsed = () => {
        dispatch(updateCollapse(!isCollapse))
    };

    return (
        <div className={'h-100% relative'}>
            <Spin spinning={loading} tip="Loading...">
            <Menu
                style={{height: '100%'}}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                triggerSubMenuAction="hover"
                mode="inline"
                theme="light"
                onClick={clickMenu}
                onOpenChange={onOpenChange}
                items={menuList}
            />
            </Spin>
            <div
                className={'absolute bottom-0 w-100% h-40px flex items-center justify-end pr-45 border-t-1px border-t-#F0F0F0'}>
                <span className={'cursor-pointer'} onClick={toggleCollapsed}>
                    {!isCollapse ? <MenuFoldOutlined/> : <MenuUnfoldOutlined/>}
                </span>
            </div>
        </div>
    )
}

export default SiderMenu
