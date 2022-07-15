import { Button, Checkbox, Form, Input } from 'antd';
import { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../css/login.css';
import API from '../../api/api';
const Login = memo(() => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        API.get('')
            .then((res) => {
                const listUsers = res.data;
                setListUsers(listUsers);
            })
            .catch((error) => console.log(error));
    }, []);

    const [form] = Form.useForm();
    const submit = () => {
        const user = listUsers.find((item) => item.username === username && item.password === password);
        if (user) {
            navigate(`/todolist/${user.id}`);
        }
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {
        form.resetFields();
    };
    return (
        <div className="login">
            <h2>Login</h2>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={() => onFinish}
                onFinishFailed={() => onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" onClick={() => submit()}>
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={() => onReset()}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
});

export default Login;
