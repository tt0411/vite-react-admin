import React, {useEffect, useState} from 'react';
import {RootState, useDispatch, useSelector} from "@/redux";
import {useLocation, useNavigate} from "react-router-dom";
import {CloseOutlined, HomeOutlined} from "@ant-design/icons";
import {searchRoute} from "@/utils";
import {setTabsActive, setTabsList} from "@/redux/modules/tabs";
import IconComp from "@/common/IconComp";
import {changeUnKeepAliveList, removeUnKeepAlive} from "@/redux/modules/global";
import MoreButton from "@/layout/Tabs/components/MoreButton";

const TabsLayout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {tabsList} = useSelector((state: RootState) => state.tabs);
    const {menuList} = useSelector((state: RootState) => state.menu);
    const {pathname} = useLocation();
    const [showDeleteIcon, setShowDeleteIcon] = useState<boolean>(false)
    const [mouseIndex, setMouseIndex] = useState<number | null>()

    useEffect(() => {
        addTabs()
    }, [pathname])

    const clickTabs = (path: string) => {
        navigate(path);
    };

    const addTabs = () => {
        if (pathname === '/home') return
        const route = searchRoute(pathname, menuList);
        let newTabsList = JSON.parse(JSON.stringify(tabsList));
        if (tabsList.every((item: any) => item.path !== route.path)) {
            newTabsList.push({title: route.meta!.title, path: route.path, icon: route.meta!.icon});
        }
        dispatch(removeUnKeepAlive(pathname));
        dispatch(setTabsList(newTabsList));
        setTabsActive(pathname);
    }

    const delTabs = (tabPath: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation()
        if (tabPath === '/home') return;
        if (pathname === tabPath) {
            dispatch(changeUnKeepAliveList(pathname))
            tabsList.forEach((item: Menu.MenuOptions, index: number) => {
                if (item.path !== pathname) return;
                const nextTab = tabsList[index - 1] || tabsList[index + 1];
                if (!nextTab) return;
                navigate(nextTab.path);
                dispatch(setTabsActive(nextTab.path))
            });
        }
        dispatch(setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath)));
    };

    const handleMouseEnter = (index: number) => {
        if(index) {
            setShowDeleteIcon(true)
            setMouseIndex(index)
        }
    }

    const handleMouseLeave = () => {
        setShowDeleteIcon(false)
        setMouseIndex(null)
    }

    return (
        <div className={'flex items-center justify-between border-b-1 border-b-#cfcfcf h-40px px-16px bg-#fff'}>
            <div className={'flex-1 flex items-center'}>
                {tabsList.map((item: Menu.MenuOptions, index: number) => {
                    return (
                        <span key={item.path} className={'flex-center cursor-pointer relative px-15px'}
                              onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}
                              onClick={() => clickTabs(item.path)}>
                            {item.path === '/home' ?
                                <HomeOutlined color={item.path === pathname ? '#1677FF' : '#cdcdcd'}/> :
                                <IconComp icon={item.icon!} color={item.path === pathname ? '#1677FF' : '#cdcdcd'}/>}
                            <span
                                className={item.path === pathname ? 'pl-5px text-[#1677FF]' : 'pl-5px text-[#cdcdcd]'}>{item.title}</span>
                            <span
                                className={item.path === pathname ? 'absolute left-3px -bottom-10px w-100% h-2px bg-[#1677FF] rounded-5px' : ''}></span>
                            {(showDeleteIcon && index === mouseIndex) &&
                                <span
                                    className={'absolute -right-3px top-0 h-full flex-center text-13px cursor-pointer'}
                                    onClick={(e) => delTabs(item.path, e)}>
                                <CloseOutlined className={'text-[#cdcdcd] hover:text-[#1677FF]'}/>
                            </span>}
                        </span>
                    )
                })}
            </div>
            <div className={'ml-20px'}>
                <MoreButton />
            </div>
        </div>
    );
};

export default TabsLayout;
