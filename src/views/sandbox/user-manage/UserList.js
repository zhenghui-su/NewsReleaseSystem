import React, {useEffect, useRef, useState} from 'react';
import {Button, Table, Modal, Switch} from "antd";
import axios from "axios";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import UserForm from "../../../components/user-manage/UserForm/UserForm";

const {confirm} = Modal;

function UserList() {
    // 后端返回实时数据作为表格数据
    const [userSource, setUserSource] = useState([]);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [roleList, setRoleList] = useState([]);
    const [regionList, setRegionList] = useState([]);
    const [current, setCurrent] = useState(null);

    const [isUpdateVisible, setIsUpdateVisible] = useState(false);
    const [isUpdateDisabled, setIsUpdateDisabled] = useState(false);

    const addForm = useRef(null);
    const updateForm = useRef(null);
    // 表格
    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            filters: [
                ...regionList.map(item => ({
                    text: item.title,
                    value: item.value,
                })),
                {
                    text: "全球",
                    value: "全球",
                }
            ],
            onFilter: (value, item) => {
                if (value === "全球") {
                    return item.region === ""
                }
                return item.region === value
            },
            render: (region) => {
                return <b>{region ? region : "全球"}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            render: (role) => {
                return role.roleName;
            }
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '用户状态',
            dataIndex: 'roleState',
            render: (roleState, item) => {
                return <Switch
                    checked={roleState}
                    disabled={item.default}
                    onChange={() => handleChange(item)}
                />
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <>
                    <Button
                        danger
                        shape="circle"
                        icon={<DeleteOutlined/>}
                        disabled={item.default}
                        onClick={() => confirmMethod(item)}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<EditOutlined/>}
                        disabled={item.default}
                        onClick={() => handleUpdate(item)}
                    />
                </>
            }
        },
    ];

    useEffect(() => {
        axios.get("http://localhost:5000/users?_expand=role").then(res => {
            setUserSource(res.data);
        });
    }, []);
    useEffect(() => {
        axios.get("http://localhost:5000/regions").then(res => {
            setRegionList(res.data);
        });
    }, []);
    useEffect(() => {
        axios.get("http://localhost:5000/roles").then(res => {
            setRoleList(res.data);
        });
    }, []);
    // 点击删除图片弹出对话框
    const confirmMethod = (item) => {
        confirm({
            title: '你确定要删除?',
            icon: <ExclamationCircleOutlined/>,
            onOk() {
                deleteMethod(item);
            },
            onCancel() {
            },
        });
    };
    // 删除方法
    const deleteMethod = (item) => {
        // 当前页面同步状态 + 后端同步
        setUserSource(userSource.filter(data => data.id !== item.id));
        axios.delete(`http://localhost:5000/users/${item.id}`).then();
    }
    // 添加提交表单方法
    const addFormOk = () => {
        addForm.current.validateFields().then((value) => {
            setIsAddVisible(false);
            addForm.current.resetFields();
            // 从post到后端 生成id 在设置userSource 方便后面的删除和更新
            axios.post(`http://localhost:5000/users`, {
                ...value,
                "roleState": true,
                "default": false,
            }).then(res => {
                setUserSource([...userSource, {
                    ...res.data,
                    role: roleList.filter(item => item.id === value.roleId)[0],
                }]);
            })
        }).catch((err) => {
            console.log(err);
        })
    }
    // 更新提交表单方法
    const updateFormOk = () => {
        updateForm.current.validateFields().then((value) => {
            setIsUpdateVisible(false);

            setUserSource(userSource.map(item => {
                if (item.id === current.id) {
                    return {
                        ...item,
                        ...value,
                        role: roleList.filter(data => data.id === value.roleId)[0],
                    }
                }
                return item;
            }))
            setIsUpdateDisabled(!isUpdateDisabled);

            axios.patch(`http://localhost:5000/users/${current.id}`, value).then()
        })
    }
    // 用户状态修改
    const handleChange = (item) => {
        item.roleState = !item.roleState;
        setUserSource([...userSource]);
        axios.patch(`http://localhost:5000/users/${item.id}`, {
            roleState: item.roleState
        }).then()
    }
    //
    // 更新修改操作
    const handleUpdate = async (item) => {
        // 更换为async操作
        await setIsUpdateVisible(true);
        if (item.roleId === 1) {
            // 禁用
            setIsUpdateDisabled(true);
        } else {
            // 取消禁用
            setIsUpdateDisabled(false);
        }
        updateForm.current.setFieldsValue(item);

        setCurrent(item);
        // setTimeout(() => {
        //     // 只有打开了表单才会显示已有的数据
        //     setIsUpdateVisible(true);
        //     if (item.roleId === 1) {
        //         // 禁用
        //         setIsUpdateDisabled(true);
        //     } else {
        //         // 取消禁用
        //         setIsUpdateDisabled(false);
        //     }
        //     setTimeout(() => {
        //         updateForm.current.setFieldsValue(item);
        //     }, 0)
        // }, 0);

    }
    return (
        <div>
            <Button type={"primary"} onClick={() => {
                setIsAddVisible(true);
            }}>添加用户</Button>
            <Table
                dataSource={userSource}
                columns={columns}
                pagination={{
                    pageSize: 5
                }}
                rowKey={item => item.id}
            />
            <Modal
                open={isAddVisible}
                title="添加用户"
                okText="确定"
                cancelText="取消"
                onCancel={() => {
                    setIsAddVisible(false);
                }}
                onOk={() => addFormOk()}
            >
                <UserForm
                    regionList={regionList}
                    roleList={roleList}
                    ref={addForm}
                />
            </Modal>

            <Modal
                open={isUpdateVisible}
                title="更新用户"
                okText="更新"
                cancelText="取消"
                onCancel={() => {
                    setIsUpdateVisible(false);
                    setIsUpdateDisabled(!isUpdateDisabled);
                }}
                onOk={() => updateFormOk()}
            >
                <UserForm
                    regionList={regionList}
                    roleList={roleList}
                    ref={updateForm}
                    isUpdateDisabled={isUpdateDisabled}
                />
            </Modal>
        </div>
    );
}

export default UserList;