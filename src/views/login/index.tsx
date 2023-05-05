import React from 'react';
import {Button, Form, Input, message} from 'antd';
import {useNavigate} from "react-router-dom";
import {t} from "i18next";
import {useDispatch} from "@/redux";
import {setToken} from "@/redux/modules/global";
const Login: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const onFinish = (values: any) => {
        const { username, password } = values
        if(username !== 'admin') {
            message.warning('用户不存在！')
            return
        }
        if(password !== '123456') {
            message.warning('密码不正确！')
            return
        }
        dispatch(setToken('token'))
        navigate('/home')
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
    <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ username: 'admin', password: '123456' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入账号!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                {t('login.confirm') as string}
            </Button>
        </Form.Item>
    </Form>
)};

export default Login;
