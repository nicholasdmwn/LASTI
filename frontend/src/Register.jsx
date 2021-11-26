import { Form, Input, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';
import './register.css';
import Axios from 'axios';
import { API_URL } from './api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [treatment, setTreatment] = useState('lain');
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('id') || localStorage.getItem('img')) {
            if (localStorage.getItem('id') && localStorage.getItem('img')) {
                navigator('/status');
                return;
            } else {
                localStorage.removeItem('id');
                localStorage.removeItem('img');
            }
        }
    }, []);

    const onSubmit = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        Axios.post(API_URL + '/api/patient/', { nama: name, noTelp: number, treatment })
            .then((res) => {
                setTreatment('lain');
                setNumber('');
                setName('');
                return res.data;
            })
            .then((res) => {
                const data = res.data;
                localStorage.setItem('img', data.image);
                localStorage.setItem('id', data.id);
                navigator('/status');
            });
    };

    return (
        <div className="register">
            <h1 style={{ textAlign: 'center', paddingBottom: '20px' }}>Audy Dental</h1>
            <div className="container">
                <Form
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
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Number"
                        name="number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your number!',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setNumber(e.target.value)} value={number} />
                    </Form.Item>

                    <Form.Item
                        label="Treatment"
                        name="treatment"
                        rules={[
                            {
                                required: true,
                                message: 'Please input treatment!',
                            },
                        ]}
                    >
                        <Select onChange={(e) => setTreatment(e)}>
                            <Option value="nmbl">Penambalan Gigi</Option>
                            <Option value="scli">Scaling Gigi</Option>
                            <Option value="bhel">Behel Gigi</Option>
                            <Option value="gmlf">Gum Lifting</Option>
                            <Option value="psyr">Perawatan Syaraf Gigi</Option>
                            <Option value="lain">Lain</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="btn-css"
                            onClick={onSubmit}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Register;
