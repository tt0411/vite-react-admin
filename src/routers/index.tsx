import React from "react";
import {RouteObject} from "@/routers/interface";
import {Navigate, useRoutes} from "react-router";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import Login from '@/views/login/index'

// * 导入所有router
const metaRouters = import.meta.globEager("./modules/*.tsx");

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
    // @ts-ignore
    Object.keys(metaRouters[item]).forEach((key: any) => {
        // @ts-ignore
        routerArray.push(...metaRouters[item][key]);
    });
});
export const rootRouter: RouteObject[] = [
    {
        path: "/",
        element: <Navigate to="/home" />
    },
    {
        element: <LayoutIndex />,
        children: [
            {
                path: "/home",
                element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
                meta: {
                    title: "首页",
                    key: "home"
                }
            },
        
        ]
    },
    {
        path: "login",
        element: <Login/>,
        meta: {
            title: "登录",
            key: "login",
        }
    },
    {
        path: "403",
        element: lazyLoad(React.lazy(() => import("@/views/exception/403/index"))),
        meta: {
            title: "403",
            key: "403",
        }
    },
    {
        path: "404",
        element: lazyLoad(React.lazy(() => import("@/views/exception/404/index"))),
        meta: {
            title: "404",
            key: "404",
        }
    },
    {
        path: "500",
        element: lazyLoad(React.lazy(() => import("@/views/exception/500/index"))),
        meta: {
            title: "500",
            key: "500",
        }
    },
    ...routerArray,
    {
        path: "*",
        element: <Navigate to="/404" />
    }
]

const Router = () => {
    // @ts-ignore
    return useRoutes(rootRouter);
};
export default Router

