import React, {useState} from 'react';
import {Header} from 'antd/es/layout/layout';
import {
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, PoweroffOutlined,
    SmileOutlined,
    UserOutlined
} from '@ant-design/icons';
import Dropdown from "antd/es/dropdown/dropdown";
import {Space} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {withRouter} from "react-router";

function TopHeader(props) {
    const [collapsed, setCollapsed] = useState(false);
    const changeCollapsed = () => {
        setCollapsed(!collapsed);
    }
    const items = [
        {
            key: '1',
            label: (
                <span>超级管理员</span>
            ),
            icon: <SmileOutlined/>,
        },
        {
            key: '2',
            label: (
                <span onClick={() => {
                    localStorage.removeItem("token");
                    props.history.replace("/login");
                }}>退出登录</span>
            ),
            icon: <PoweroffOutlined/>,
            danger: true,

        },


    ];
    return (
        //头部栏
        <Header className='site-layout-background' style={{padding: '0 16px'}}>
            {
                collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}/> :
                    <MenuFoldOutlined onClick={changeCollapsed}/>
            }
            <div style={{float: "right"}}>
                <span>欢迎admin回来</span>
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <Space>
                        <Avatar
                            style={{
                                backgroundColor: '#6AE2D6FF',
                            }}
                            icon={<UserOutlined/>}
                        />
                        <DownOutlined/>
                    </Space>
                </Dropdown>
            </div>
        </Header>
    );
}

export default withRouter(TopHeader);
