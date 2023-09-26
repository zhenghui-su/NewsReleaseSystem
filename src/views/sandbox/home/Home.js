import React, {useEffect, useRef, useState} from "react";
import {Card, Col, Drawer, List, Row} from "antd";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import Avatar from "antd/es/avatar/avatar";
import axios from "axios";
import * as Echarts from "echarts";
import _ from "lodash";

// 主页
function Home() {
    // 第一个最常浏览数据
    const [viewList, setViewList] = useState([]);
    // 第二个点赞最多数据
    const [starList, setStarList] = useState([]);
    // 最开始请求的数据
    const [allList, setAllList] = useState([]);
    // 抽屉组件是否显示
    const [drawerVisible, setDrawerVisible] = useState(false);
    // 饼状图
    const [pieChart, setPieChart] = useState(null);
    const barRef = useRef();
    const pieRef = useRef();
    // 浏览数据
    useEffect(() => {
        axios.get(`/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6`).then(res => {
            setViewList(res.data);
        });
    }, []);
    // 点赞数据
    useEffect(() => {
        axios.get("/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6").then(res => {
            // console.log(res.data)
            setStarList(res.data);
        });
    }, []);
    // 请求图表数据 并处理
    useEffect(() => {
        axios.get("/news?publishState=2&_expand=category").then(res => {
            renderBarView(_.groupBy(res.data, item => item.category.title));
            setAllList(res.data);
        });
        return () => {
            window.onresize = null;
        };
    }, []);
    // 柱状图
    const renderBarView = (obj) => {
        let myChart = Echarts.init(barRef.current);

        // 指定图表的配置项和数据
        let option = {
            title: {
                text: "新闻分类图示"
            },
            tooltip: {},
            legend: {
                data: ["数量"]
            },
            xAxis: {
                data: Object.keys(obj),
                axisLabel: {
                    rotate: "45",
                    interval: 0
                }
            },
            yAxis: {
                minInterval: 1
            },
            series: [{
                name: "数量",
                type: "bar",
                data: Object.values(obj).map(item => item.length)
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        window.onresize = () => {
            // console.log("resize")
            myChart.resize();
        };
    };
    // 饼状图
    const renderPieView = () => {
        //数据处理工作
        const currentList = allList.filter(item => item.author === username);
        const groupObj = _.groupBy(currentList, item => item.category.title);
        const list = [];
        for (let i in groupObj) {
            list.push({
                name: i,
                value: groupObj[i].length
            });
        }
        let myChart;
        if (!pieChart) {
            myChart = Echarts.init(pieRef.current);
            setPieChart(myChart);
        } else {
            myChart = pieChart;
        }
        let option = {
            title: {
                text: "当前用户新闻分类图示",
                // subtext: '纯属虚构',
                left: "center"
            },
            tooltip: {
                trigger: "item"
            },
            legend: {
                orient: "vertical",
                left: "left",
            },
            series: [
                {
                    name: "发布数量",
                    type: "pie",
                    radius: "50%",
                    data: list,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                }
            ]
        };
        option && myChart.setOption(option);
    };

    // 用户登录存在localstorage的数据
    const {username, region, role: {roleName}} = JSON.parse(localStorage.getItem("token"));
    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {/*卡片三等分*/}
                <Col span={8}>
                    <Card title="用户最常浏览" bordered={true}>
                        <List
                            size="small"
                            dataSource={viewList} // 只渲染对象中的title属性
                            renderItem={(item) => <List.Item>
                                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                            </List.Item>}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="用户点赞最多" bordered={true}>
                        <List
                            size="small"
                            dataSource={starList}
                            renderItem={(item) => <List.Item>
                                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                            </List.Item>}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        cover={
                            <img
                                alt="example"
                                src="./background_20030926.png"
                            />
                        }
                        actions={[
                            <SettingOutlined
                                key="setting"
                                onClick={async () => {
                                    // 异步等左拉框出来了再去寻找ref对应的dom
                                    // 变为同步更新
                                    await setDrawerVisible(true);
                                    // init初始化
                                    renderPieView();
                                }}
                            />,
                            <EditOutlined key="edit"/>,
                            <EllipsisOutlined key="ellipsis"/>,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="./avatar_20030926.jpg"/>}
                            title={username}
                            description={
                                <div>
                                    <b>{region ? region : "全球"}</b>
                                    <span style={{
                                        paddingLeft: "30px"
                                    }}>{roleName}</span>
                                </div>
                            }
                        />
                    </Card>
                </Col>
            </Row>
            <Drawer
                width="500px"
                title="个人新闻分类"
                placement="right"
                closable={true}
                onClose={() => {
                    setDrawerVisible(false);
                }}
                open={drawerVisible}
            >
                <div ref={pieRef} style={{
                    width: "100%",
                    height: "400px",
                    marginTop: "30px"
                }}/>
            </Drawer>


            <div ref={barRef} style={{
                width: "100%",
                height: "400px",
                marginTop: "30px"
            }}/>
        </div>
    );
}

export default Home;