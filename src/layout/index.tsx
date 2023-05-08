import React from "react";
import {Layout, theme} from "antd";
// import {Outlet} from "react-router";
import SiderMenu from "@/layout/SiderMenu";
import HeaderLayout from "@/layout/Header";
import {RootState, useSelector} from "@/redux";
import TabsLayout from "@/layout/Tabs";
import KeepAlive from "@/layout/components/KeepAlive";
import './index.scss'

const LayoutIndex = () => {
    const {Sider, Content, Header} = Layout
    const {isCollapse} = useSelector((state: RootState) => state.menu);
    const {unKeepAliveList} = useSelector((state: RootState) => state.global);
    const {token: {colorBgContainer}} = theme.useToken();

    return (
        <Layout className={'h-100vh'}>
            <Header>
                <HeaderLayout/>
            </Header>
            <Layout>
                <Sider style={{background: colorBgContainer}} trigger={null} collapsed={isCollapse}>
                    <SiderMenu />
                </Sider>
                <Layout>
                    <TabsLayout/>
                    <Content>
                        {/* <Outlet></Outlet> */}
                        {/* 路由缓存 */}
                        <KeepAlive exclude={unKeepAliveList}></KeepAlive>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
export default LayoutIndex
