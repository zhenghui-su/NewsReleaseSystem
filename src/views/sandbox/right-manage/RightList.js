import React, {useEffect, useState} from 'react';
import {Button, Table, Tag, Modal} from "antd";
import axios from "axios";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";

const {confirm} = Modal;

function RightList() {
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
            title: '权限名称',
            dataIndex: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: (key) => {
                return <Tag color="cyan">{key}</Tag>
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
                        onClick={() => confirmMethod(item)}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<EditOutlined/>}
                    />
                </>
            }
        },
    ];
    // 后端返回实时数据作为表格数据
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/rights?_embed=children").then(res => {
            const list = res.data;
            list.forEach(item => {
                if (item.children.length === 0) {
                    item.children = ""
                }
            });
            setDataSource(list);
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
        if (item.grade === 1) {
            setDataSource(dataSource.filter(data => data.id !== item.id));
            axios.delete(`http://localhost:5000/rights/${item.id}`).then();
        } else {
            let list = dataSource.filter(data => data.id === item.rightId);
            list[0].children = list[0].children.filter(data => data.id !== item.id);
            setDataSource([...dataSource]);
            axios.delete(`http://localhost:5000/children/${item.id}`).then();
        }
    }
    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    pageSize: 5
                }}
            />
        </div>
    );
}

export default RightList;