export const routeModel: any = [
    {
        path: '/system',
        element: 'layout',
        label: '系统管理',
        meta: {
            title: '系统管理',
            icon: 'icon-xitongguanli2',
            key: 'system'
        },
        children: [
            {
                path: '/system/organization',
                element: '/system/organization',
                label: '组织机构管理',
                meta: {
                    icon: 'icon-zuzhijigou-',
                    title: '组织机构管理',
                    key: 'organization'
                }
            },
            {
                path: '/system/role',
                element: '/system/role',
                label: '角色管理',
                meta: {
                    icon: 'icon-yidongyunkongzhitaiicon45',
                    title: '角色管理',
                    key: 'role'
                }
            },
            {
                path: '/system/user',
                element: '/system/user',
                label: '用户管理',
                meta: {
                    icon: 'icon-yonghuguanli',
                    title: '用户管理',
                    key: 'user'
                }
            },
            {
                path: '/system/menu',
                element: '/system/menu',
                label: '菜单管理',
                meta: {
                    icon: 'icon-caidanguanli',
                    title: '菜单管理',
                    key: 'menu'
                }
            },
        ],
    },
    {
        path: '/contentManage',
        element: 'layout',
        label: '内容管理',
        meta: {
            title: '内容管理',
            icon: 'icon-neirongguanli',
            key: 'contentManage'
        },
        children: [
            {
                path: '/contentManage/category',
                element: '/contentManage/category',
                label: '分类管理',
                meta: {
                    icon: 'icon--fenleiguanli',
                    title: '分类管理',
                    key: 'category'
                }
            },
            {
                path: '/contentManage/list',
                element: '/contentManage/list',
                label: '内容列表',
                meta: {
                    icon: 'icon-neirongliebiao',
                    title: '内容列表',
                    key: 'list'
                }
            },
        ],
    },
]
