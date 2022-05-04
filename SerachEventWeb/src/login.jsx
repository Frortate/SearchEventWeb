import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

const uri = 'http://localhost:32143/api/Account/';

const Login = () => { // компонент для входа в аккаунт
    let navigate = useNavigate();
    axios.defaults.withCredentials = true;
    axios.post(uri + 'checkRole')
        .then((response) => {
            if (response.status == 200) {
                console.log(response.data);
                if (response.data.role === "admin") {
                    navigate("../admin", { replace: true });
                }
                if (response.data.role === "user") {
                    navigate("../user", { replace: true });
                }
            }
        })
        .catch(console.error);

    const onFinish = (values) => { // вход пользователя
        const body = { email: values.username, password: values.password, rememberMe: values.remember };
        axios.post(uri + 'Login', body, { withCredentials: true })
            .then((response) => {
                if (response.status == 200) {
                    if (response.data.role === "admin") {
                        navigate("../admin", { replace: true });
                    }
                    else {
                        navigate("../user", { replace: true });
                    }
                }
                else {
                    setMsg(response.data.error);
                }
            })
            .catch(console.error);
    };

    const [msg, setMsg] = useState(""); // сообщение о проблемах во время входа

    return (
        <div align="center" className='container'>

            <br />
            <h2 >Вход в аккаунт</h2>
            <br />
            <Card hoverable style={{ width: 600 }} >
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Введите почту!',
                            },
                        ]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Почта" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Введите пароль!',
                            },
                        ]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Пароль"/>
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Запомнить</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button shape="round" type="primary" htmlType="submit" className="login-form-button">
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <p>{msg}</p>     
        </div>
    );
};

export default Login