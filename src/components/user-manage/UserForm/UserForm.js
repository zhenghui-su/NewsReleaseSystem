import React, {forwardRef, useEffect, useState} from 'react';
import {Form, Select} from "antd";
import Input from "antd/es/input/Input";

const {Option} = Select;
const UserForm = forwardRef((props, ref) => {
        const [isDisable, setIsDisable] = useState(false);

        useEffect(() => {
            setIsDisable(props.isUpdateDisabled);
        }, [props.isUpdateDisabled]);

        return (
            <Form
                ref={ref}
                layout="vertical"
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        {
                            required: true,
                            message: '用户名是必填项！',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '密码是必填项！',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="region"
                    label="区域"
                    rules={isDisable ? [] : [
                        {
                            required: true,
                            message: '区域是必填项！',
                        },
                    ]}
                >
                    <Select disabled={isDisable}>
                        {
                            props.regionList.map(item =>
                                <Option
                                    value={item.value}
                                    key={item.id}
                                >
                                    {item.title}
                                </Option>
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="roleId"
                    label="角色"
                    rules={[
                        {
                            required: true,
                            message: '角色是必填项！',
                        },
                    ]}
                >
                    <Select onChange={(value) => {
                        if (value === 1) {
                            setIsDisable(true);
                            ref.current.setFieldsValue({
                                region: ""
                            })
                        } else {
                            setIsDisable(false);
                        }
                    }}>
                        {
                            props.roleList.map(item =>
                                <Option value={item.id} key={item.id}>{item.roleName}</Option>
                            )
                        }
                    </Select>
                </Form.Item>
            </Form>
        );
    }
)
export default UserForm;