import React, {useEffect, useState} from 'react';
import {Button, Modal, Table} from "antd";
import {DeleteOutlined, ExclamationCircleOutlined, UnorderedListOutlined} from "@ant-design/icons";
import axios from "axios";
import Tree from "antd/es/tree/Tree";

const {confirm} = Modal;

function RoleList() {
    // 后端返回实时数据作为表格数据
    const [roleSource, setRoleSource] = useState([]);
    // 控制对话框Modal是否出现
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 树形控件数据
    const [rightList, setRightList] = useState([]);
    // 当前的控件数据rights
    const [currentRights, setCurrentRights] = useState([]);
    // 当前选中的控件ID
    const [currentId, setCurrentId] = useState(0);
    // 表格
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: '操作',
            render: (item) => {
                return <>
                    <Button
                        danger
                        shape="circle"
                        icon={<DeleteOutlined/>}
                        onClick={() => confirmMethod(item)}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<UnorderedListOutlined/>}
                        onClick={() => {
                            setIsModalOpen(true);
                            setCurrentRights(item.rights);
                            setCurrentId(item.id);
                        }}
                    />

                </>
            }
        },
    ];
    // 请求数据
    useEffect(() => {
        axios.get("/roles").then(res => {
            setRoleSource(res.data);
        });
    }, []);
    useEffect(() => {
        axios.get("/rights?_embed=children").then(res => {
            setRightList(res.data);
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
        setRoleSource(roleSource.filter(data => data.id !== item.id));
        axios.delete(`/roles/${item.id}`).then();
    };
    const handleOk = () => {
        setIsModalOpen(false);
        // 同步roleSource
        setRoleSource(roleSource.map(item => {
            if (item.id === currentId) {
                return {
                    ...item,
                    rights: currentRights
                }
            }
            return item;
        }))
        // patch
        axios.patch(`/roles/${currentId}`, {
            rights: currentRights
        }).then()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // 当前树形结构中选中的，点击取消或添加然后重新设置数据
    const onCheck = (checkKeys) => {
        setCurrentRights(checkKeys.checked);
    };
    return (
        <div>
            <Table
                dataSource={roleSource}
                columns={columns}
                rowKey={(item) => item.id}
            />
            <Modal title="权限分配" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    checkedKeys={currentRights}
                    onCheck={onCheck}
                    checkStrictly={true}
                    treeData={rightList}
                />
            </Modal>
        </div>
    );
}

export default RoleList;