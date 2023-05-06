import React from 'react'
import {useNavigate} from "react-router-dom";
import {Dropdown, Image, MenuProps, message, Modal, Space} from "antd";
import {ExclamationCircleOutlined, LogoutOutlined} from "@ant-design/icons";
import {useDispatch} from "@/redux";
import { resetGlobalStore } from "@/redux/modules/global";
import { resetTabsStore } from "@/redux/modules/tabs";
import {resetMenuStore} from "@/redux/modules/menu";


const UserComp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const items: MenuProps['items'] = [
        // {
        //     label: (
        //         <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        //             1st menu item
        //         </a>
        //     ),
        //     key: '0',
        // },
        // {
        //     label: (
        //         <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        //             2nd menu item
        //         </a>
        //     ),
        //     key: '1',
        // },
        // {
        //     type: 'divider',
        // },
        {
            label: '退出登录',
            key: '3',
            icon: <LogoutOutlined />,
        },
    ];
    const logout = () => {
        navigate("/login")
        dispatch(resetGlobalStore())
        dispatch(resetTabsStore())
        dispatch(resetMenuStore())
        localStorage.removeItem('persist:redux-state')

    }
    const onClick: MenuProps['onClick'] = ({ key }) => {
        if(key === '3') {
            Modal.confirm({
                title: '是否确认退出系统？',
                icon: <ExclamationCircleOutlined />,
                onOk: () => {
                    logout()
                }
            })
        }
    };

    return (
        <Dropdown menu={{ items, onClick }}>
            <div className={'flex items-center pr-20px'} onClick={(e) => e.preventDefault()}>
                <Image
                    width={24}
                    src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                />
                <span className={'text-#fff pl-12px cursor-pointer'}>admin</span>
            </div>
        </Dropdown>
    )
}

export default UserComp
