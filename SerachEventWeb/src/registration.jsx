import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

const uri = 'http://localhost:32143/api/Account/';

const Register = () => { // компонент для регистрации нового пользователя
    let navigate = useNavigate();
    const onFinish = (values) => { // отправка данных нового аккаунта

        const body = { email: values.username, password: values.password, passwordConfirm: values.rpassword };
        console.log('body');
        axios.post(uri + 'Register', body, { withCredentials: true })
            .then((response) => {
                if (response.status == 200) {
                    navigate("../user", { replace: true });
                }
                else {
                    setMsg(response.data.error);
                }
            })
            .catch(console.error);
    };

    const [msg, setMsg] = useState("");

    return (
        <div align="center" className='container'>
            <br />
            <h2>Регистрация</h2>
            <br />
            <Card hoverable style={{ width: 600 }} >
                <Form
                    name="normal_register"
                    className="register-form"
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
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Пароль" />
                    </Form.Item>

                    <Form.Item
                        name="rpassword"
                        rules={[
                            {
                                required: true,
                                message: 'Повторите пароль!',
                            },
                        ]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="rpassword" placeholder="Повторите пароль"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="register-form-button">
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <p>{msg}</p>
        </div>
    );
};

export default Register