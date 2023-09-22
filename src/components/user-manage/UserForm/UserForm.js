import React, {forwardRef, useEffect, useState} from "react";
import {Form, Select} from "antd";
import Input from "antd/es/input/Input";

const {Option} = Select;
// 登录表单
const UserForm = forwardRef((props, ref) => {
        const [isDisable, setIsDisable] = useState(false);

        useEffect(() => {
            setIsDisable(props.isUpdateDisabled);
        }, [props.isUpdateDisabled]);

        const {roleId, region} = JSON.parse(localStorage.getItem("token"));
        const roleObj = {
            "1": "superAdmin",
            "2": "admin",
            "3": "editor"
        };
        const checkRegionDisabled = (item) => {
            if (props.isUpdate) {
                return roleObj[roleId] !== "superAdmin";
            } else {
                if (roleObj[roleId] === "superAdmin") {
                    return false;
                } else {
                    return item.value !== region;
                }
            }
        };
        const checkRoleDisabled = (item) => {
            if (props.isUpdate) {
                return roleObj[roleId] !== "superAdmin";
            } else {
                if (roleObj[roleId] === "superAdmin") {
                    return false;
                } else {
                    return roleObj[item.id] !== "editor";
                }
            }
        };

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
                            message: "用户名是必填项！",
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
                            message: "密码是必填项！",
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
                            message: "区域是必填项！",
                        },
                    ]}
                >
                    <Select disabled={isDisable}>
                        {
                            props.regionList.map(item =>
                                <Option
                                    value={item.value}
                                    key={item.id}
                                    disabled={checkRegionDisabled(item)}
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
                            message: "角色是必填项！",
                        },
                    ]}
                >
                    <Select onChange={(value) => {
                        if (value === 1) {
                            setIsDisable(true);
                            ref.current.setFieldsValue({
                                region: ""
                            });
                        } else {
                            setIsDisable(false);
                        }
                    }}>
                        {
                            props.roleList.map(item =>
                                <Option
                                    value={item.id}
                                    key={item.id}
                                    disabled={checkRoleDisabled(item)}
                                >
                                    {item.roleName}
                                </Option>
                            )
                        }
                    </Select>
                </Form.Item>
            </Form>
        );
    }
);
export default UserForm;