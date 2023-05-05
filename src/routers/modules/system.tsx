import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// system 模块
const systemRouter: Array<RouteObject> = [
    {
        element: <LayoutIndex />,
        meta: {
            title: "系统管理"
        },
        children: [
            {
                path: "/system/menu",
                element: lazyLoad(React.lazy(() => import("@/views/system/menu/index"))),
                meta: {
                    title: "菜单管理",
                    key: "menu"
                }
            },
            {
                path: "/system/organization",
                element: lazyLoad(React.lazy(() => import("@/views/system/organization/index"))),
                meta: {
                    title: "组织机构管理",
                    key: "organization"
                }
            },
            {
                path: "/system/role",
                element: lazyLoad(React.lazy(() => import("@/views/system/role/index"))),
                meta: {
                    title: "角色管理",
                    key: "role"
                }
            },
            {
                path: "/system/user",
                element: lazyLoad(React.lazy(() => import("@/views/system/user/index"))),
                meta: {
                    title: "用户管理",
                    key: "user"
                }
            }
        ]
    }
];

export default systemRouter;
