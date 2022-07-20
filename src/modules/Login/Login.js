import { Button, Checkbox, Form, Input } from 'antd';
import { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { database, auth } from '../../api/firebase';

import '../../css/login.css';
const Login = memo(() => {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate(`/todolist/${auth.currentUser.uid}`);
            }
        });
    }, []);
    const [form] = Form.useForm();
    const submit = () => {
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate(`/todolist/${auth.currentUser.uid}`);
                })
                .catch((err) => alert(err.message));
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
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input onChange={(e) => setEmail(e.target.value.trim())} />
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
                    <Input.Password onChange={(e) => setPassword(e.target.value.trim())} />
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
                    <Button type="primary" htmlType="submit" onClick={submit}>
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
});

export default Login;
