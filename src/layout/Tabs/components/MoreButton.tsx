import {CloseOutlined, ColumnWidthOutlined, DownOutlined, SwapOutlined} from '@ant-design/icons';
import React from 'react';
import {Dropdown, MenuProps, Space} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {changeUnKeepAliveList, removeUnKeepAlive} from "@/redux/modules/global";
import {RootState, useDispatch, useSelector} from "@/redux";
import {setIsShow, setTabsActive, setTabsList} from "@/redux/modules/tabs";


const MoreButton = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate();
    const {tabsList} = useSelector((state: RootState) => state.tabs);
    const dispatch = useDispatch()

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: '刷新本页',
            icon: <SwapOutlined />,
        },
        {
            key: '2',
            label: '关闭其他标签页',
            icon: <ColumnWidthOutlined />,
        },
        {
            key: '3',
            label: '关闭当前标签页',
            icon: <CloseOutlined />,
        },
    ];

    const onClick: MenuProps['onClick'] = ({ key }) => {
        if(key === '1') {
             dispatch(changeUnKeepAliveList(pathname))
             dispatch(setIsShow(false))
             setTimeout(() => {
                dispatch(setIsShow(true))
             })
             dispatch(removeUnKeepAlive(pathname));
        }else if(key === '2') {
            // 将关闭tab页面移除缓存
            tabsList.forEach((item: Menu.MenuOptions) => {
                if(item.path !== pathname && item.path !== '/home') {
                    dispatch(changeUnKeepAliveList(item.path))
                }
            })
           dispatch(setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path === pathname || item.path === '/home')));
        }else if(key === '3') {
            dispatch(changeUnKeepAliveList(pathname))
            tabsList.forEach((item: Menu.MenuOptions, index: number) => {
                if (item.path !== pathname) return;
                const nextTab = tabsList[index - 1] || tabsList[index + 1];
                if (!nextTab) return;
                navigate(nextTab.path);
                dispatch(setTabsActive(nextTab.path))
            });
            dispatch(setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== pathname)));
        }
    };


    return (
       <div>
           <Dropdown menu={{ items, onClick }}>
               <a className={'text-#999'} onClick={(e) => e.preventDefault()}>
                   <Space>
                      更多
                       <DownOutlined />
                   </Space>
               </a>
           </Dropdown>
        </div>
    );
};

export default MoreButton;
