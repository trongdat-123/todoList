import { Button, Checkbox, Form, Input, Space } from 'antd';
import { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDatabase, ref, push, set, update } from 'firebase/database';

import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { database, auth } from '../../api/firebase';

import '../../css/login.css';
const Welcome = memo(() => {
    let navigate = useNavigate();
    const db = database;

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerInformation, setRegisterInformation] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate(`/todolist/${auth.currentUser.uid}`);
            }
        });
    }, []);

    const setChange = () => {
        if (isRegistering) {
            setIsRegistering(false);
            onReset();
        } else {
            setIsRegistering(true);
            onReset();
        }
    };

    const onLogin = () => {
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate(`/todolist/${auth.currentUser.uid}`);
                })
                .catch((err) => alert(err.message));
        }
    };

    const onRegister = () => {
        if (registerInformation.password !== registerInformation.confirmPassword) {
            alert('Please confirm that password are the same');
            return;
        }
        createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password)
            .then(() => {
                const userRef = ref(db, 'users/' + auth.currentUser.uid);
                var newUser = {
                    todo: [],
                    email: registerInformation.email,
                    password: registerInformation.password,
                };
                set(userRef, newUser)
                    .then((res) => {
                        navigate(`/todolist/${auth.currentUser.uid}`);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((err) => alert(err.message));
    };

    const [form] = Form.useForm();
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
        <>
            {isRegistering ? (
                <div className="register">
                    <h2>Register</h2>
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
                            <Input
                                value={registerInformation.email}
                                onChange={(e) =>
                                    setRegisterInformation({
                                        ...registerInformation,
                                        email: e.target.value.trim(),
                                    })
                                }
                            />
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
                            <Input.Password
                                value={registerInformation.password}
                                onChange={(e) =>
                                    setRegisterInformation({
                                        ...registerInformation,
                                        password: e.target.value.trim(),
                                    })
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            label="Confirm password"
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your cofirm password!',
                                },
                            ]}
                        >
                            <Input.Password
                                value={registerInformation.confirmPassword}
                                onChange={(e) =>
                                    setRegisterInformation({
                                        ...registerInformation,
                                        confirmPassword: e.target.value.trim(),
                                    })
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" onClick={onRegister}>
                                Register
                            </Button>

                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <span>
                                Already have an account?
                                <Button type="" className="changeForm" onClick={setChange}>
                                    Sign in
                                </Button>
                            </span>
                        </Form.Item>
                    </Form>
                </div>
            ) : (
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
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" onClick={onLogin}>
                                Login
                            </Button>

                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <span>
                                Or
                                <Button type="" className="changeForm" onClick={setChange}>
                                    register now!
                                </Button>
                            </span>
                        </Form.Item>
                    </Form>
                </div>
            )}
        </>
    );
});

export default Welcome;
