import React, {useEffect, useState} from "react";
import {Button, Table, Modal, notification} from "antd";
import axios from "axios";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, UploadOutlined} from "@ant-design/icons";

const {confirm} = Modal;

function NewsDraft(props) {
    // 表格
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            render: (id) => {
                return <b>{id}</b>;
            }
        },
        {
            title: "新闻标题",
            dataIndex: "title",
            render: (title, item) => {
                return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>;
            }
        },
        {
            title: "作者",
            dataIndex: "author",
        },
        {
            title: "分类",
            dataIndex: "category",
            render: (category) => {
                return category.title;
            }
        },
        {
            title: "操作",
            render: (item) => {
                return <div>
                    <Button
                        danger
                        shape="circle"
                        icon={<DeleteOutlined/>}
                        onClick={() => confirmMethod(item)}
                    />
                    <Button
                        style={{margin: "0 10px"}}
                        shape="circle"
                        icon={<EditOutlined/>}
                        onClick={() => {
                            props.history.push(`/news-manage/update/${item.id}`);
                        }}
                    />
                    <Button
                        shape="circle"
                        type={"primary"}
                        icon={<UploadOutlined/>}
                        onClick={() => handleCheck(item.id)}
                    />
                </div>;
            }
        },
    ];
    // 后端返回实时数据作为表格数据
    const [dataSource, setDataSource] = useState([]);

    const {username} = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        axios.get(`news?author=${username}&auditState=0&_expand=category`)
            .then(res => {
                setDataSource(res.data);
            });
    }, [username]);

    const handleCheck = (id) => {
        axios.patch(`/news/${id}`, {
            auditState: 1
        }).then(() => {
            props.history.push("/audit-manage/list");
            notification.info({
                message: `通知`,
                description: `您可以到审核列表中查看您的新闻`,
                placement: "bottomRight"
            });
        });
    };
    // 点击删除图片弹出对话框
    const confirmMethod = (item) => {
        confirm({
            title: "你确定要删除?",
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
        setDataSource(dataSource.filter(data => data.id !== item.id));
        axios.delete(`/news/${item.id}`).then();
    };
    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    pageSize: 5
                }}
                rowKey={item => item.id}
            />
        </div>
    );
}

export default NewsDraft;