import lazyLoad from "@/routers/utils/lazyLoad";
import React from "react";

export function generateRouter(list: any[]) {
    const metaRouters = import.meta.glob("@/views/**/*.tsx");
    let newRouters;
    newRouters = list.map(item => {
        if (item.children) {
            item = {...item, children: generateRouter(item.children)}
          } else {
            item = {...item}
          }
        if(item.element === 'layout') {
            const newElement = lazyLoad(React.lazy(() => import("@/layout/index")));
            item = {...item, element: newElement};
          } else {
            // @ts-ignore
            const newElement = lazyLoad(React.lazy(metaRouters[`/src/views${item.path}/index.tsx`]));
            item = {...item, element: newElement};
          }
        return item
    });
    return newRouters
}

