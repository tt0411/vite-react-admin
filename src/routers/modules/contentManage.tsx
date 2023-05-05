import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// contentManage 模块
const contentManageRouter: Array<RouteObject> = [
    {
        element: <LayoutIndex />,
        meta: {
            title: "内容管理"
        },
        children: [
            {
                path: "/contentManage/category",
                element: lazyLoad(React.lazy(() => import("@/views/contentManage/category/index"))),
                meta: {
                    title: "分类管理",
                    key: "category"
                }
            },
            {
                path: "/contentManage/list",
                element: lazyLoad(React.lazy(() => import("@/views/contentManage/list/index"))),
                meta: {
                    title: "内容列表",
                    key: "list"
                }
            },
        ]
    }
];

export default contentManageRouter;
