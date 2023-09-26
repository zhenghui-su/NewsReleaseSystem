import React, {useEffect, useRef, useState} from "react";
import {Button, Form, message, notification, PageHeader, Select, Steps} from "antd";
import style from "./News.module.css";
import Input from "antd/es/input/Input";
import axios from "axios";
import NewsEditor from "../../../components/news-manage/NewsEditor";

function NewsAdd(props) {
    const [current, setCurrent] = useState(0);
    const items = [
        {
            title: "基本信息",
            description: "新闻标题，新闻分类",
        },
        {
            title: "新闻内容",
            description: "新闻主题内容",
        },
        {
            title: "新闻提交",
            description: "保存草稿或提交审核",
        },
    ];
    const [categoryList, setCategoryList] = useState([]);

    const [formInfo, setFormInfo] = useState({});
    const [content, setContent] = useState("");
    const NewsForm = useRef(null);

    const User = JSON.parse(localStorage.getItem(("token")));

    const handleNext = () => {
        if (current === 0) {
            // 表单校验看是否填完
            NewsForm.current.validateFields().then(res => {
                setFormInfo(res);
                setCurrent(current + 1);
            }).catch(error => {
                console.log(error);
            });
        } else {
            if (content === "" || content.trim() === "<p></p>") {
                message.error("新闻内容不能为空").then();
            } else {
                setCurrent(current + 1);
            }

        }
    };
    const handlePrevious = () => {
        setCurrent(current - 1);
    };
    useEffect(() => {
        axios.get("/categories").then(res => {
            setCategoryList(res.data);
        });
    }, []);

    const handleSave = (auditState) => {

        axios.post("/news", {
            ...formInfo,
            "content": content,
            "region": User.region ? User.region : "全球",
            "author": User.username,
            "roleId": User.roleId,
            "auditState": auditState,
            "publishState": 0,
            "createTime": Date.now(),
            "star": 0,
            "view": 0,
            // "publishTime": 0
        }).then(() => {
            props.history.push(auditState === 0 ?
                "/news-manage/draft" :
                "/audit-manage/list");
            notification.info({
                message: `通知`,
                description: `您可以到${auditState === 0 ? "草稿箱" : "审核列表"}中查看您的新闻`,
                placement: "bottomRight",
            });
        });
    };
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="撰写新闻"
                subTitle="This is a subtitle"
            />

            <Steps
                current={current}
                items={items}
            />

            <div style={{marginTop: "50px"}}>
                <div className={current === 0 ? "" : style.active}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 2,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off"
                        ref={NewsForm}
                    >
                        <Form.Item
                            label="新闻标题"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入新闻标题!",
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="新闻分类"
                            name="categoryId"
                            rules={[
                                {
                                    required: true,
                                    message: "请填入新闻分类!",
                                },
                            ]}
                        >
                            <Select>
                                {
                                    categoryList.map(item =>
                                        <Select.Option
                                            value={item.id}
                                            key={item.id}
                                        >
                                            {item.title}
                                        </Select.Option>
                                    )
                                }

                            </Select>
                        </Form.Item>
                    </Form>
                </div>
                <div className={current === 1 ? "" : style.active}>
                    <NewsEditor getContent={(value) => {
                        setContent(value);
                    }}/>
                </div>
                <div className={current === 2 ? "" : style.active}>

                </div>
            </div>

            <div style={{marginTop: "50px"}}>
                {
                    current === 2 &&
                    <span>
                            <Button
                                type={"primary"}
                                onClick={() => handleSave(0)}
                            >保存草稿箱</Button>
                            <Button
                                danger={true}
                                onClick={() => handleSave(1)}
                            >提交审核</Button>
                        </span>
                }
                {
                    current < 2 &&
                    <Button
                        type={"primary"}
                        onClick={handleNext}
                    >下一步</Button>
                }
                {
                    current > 0 &&
                    <Button
                        onClick={handlePrevious}
                    >上一步</Button>
                }
            </div>
        </div>
    );
}

export default NewsAdd;