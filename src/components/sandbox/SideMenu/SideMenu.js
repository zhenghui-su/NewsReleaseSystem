import React, {useEffect, useState} from 'react';
import {
    AppstoreAddOutlined,
    AppstoreOutlined,
    CloudDownloadOutlined,
    CloudOutlined,
    CloudSyncOutlined,
    CloudUploadOutlined,
    ClusterOutlined,
    ContactsOutlined,
    DatabaseOutlined,
    HistoryOutlined,
    IdcardOutlined,
    MenuOutlined,
    MinusOutlined,
    MonitorOutlined,
    PlusOutlined,
    ProfileOutlined,
    PushpinOutlined,
    SolutionOutlined,
    TeamOutlined,
    ToolOutlined,
    UploadOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
    UsergroupAddOutlined,
    UsergroupDeleteOutlined,
    UserOutlined,
    UserSwitchOutlined,
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import './SideMenu.css'
import {withRouter} from "react-router-dom";
import axios from "axios";

const {Sider} = Layout;

function SideMenu(props) {
    // 通过后端返回侧边栏的数据来创建Menu
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/rights?_embed=children").then(res => {
            setMenu(res.data);
        })
    }, [])
    // 图标列表
    const iconList = {
        "/home": <UploadOutlined/>,
        "/user-manage": <UserOutlined/>,
        "/user-manage/list": <TeamOutlined/>,
        "/right-manage": <ContactsOutlined/>,
        "/right-manage/role/list": <SolutionOutlined/>,
        "/right-manage/right/list": <IdcardOutlined/>,
        "/user-manage/add": <UserAddOutlined/>,
        "/user-manage/delete": <UserDeleteOutlined/>,
        "/user-manage/update": <UserSwitchOutlined/>,
        "/right-manage/role/update": <UsergroupAddOutlined/>,
        "/right-manage/role/delete": <UsergroupDeleteOutlined/>,
        "/right-manage/right/update": <ToolOutlined/>,
        "/right-manage/right/delete": <PushpinOutlined/>,
        "/news-manage": <ProfileOutlined/>,
        "/news-manage/list": <MenuOutlined/>,
        "/news-manage/add": <PlusOutlined/>,
        "/news-manage/update/:id": <MinusOutlined/>,
        "/news-manage/preview/:id": <MonitorOutlined/>,
        "/news-manage/draft": <HistoryOutlined/>,
        "/news-manage/category": <DatabaseOutlined/>,
        "/audit-manage": <ClusterOutlined/>,
        "/audit-manage/audit": <AppstoreAddOutlined/>,
        "/audit-manage/list": <AppstoreOutlined/>,
        "/publish-manage": <CloudOutlined/>,
        "/publish-manage/unpublished": <CloudSyncOutlined/>,
        "/publish-manage/published": <CloudUploadOutlined/>,
        "/publish-manage/sunset": <CloudDownloadOutlined/>
        //.......
    };
    // 判断逻辑是否显示
    const checkPagePermission = (item) => {
        return item.pagepermisson === 1;
    }
    // 递归返回数据中的children部分来达到下拉菜单
    const renderMenu = (menuList) => {
        return menuList.map(item => {
            if (item.children?.length > 0 && checkPagePermission(item)) {
                return {
                    label: item.title,
                    key: item.key,
                    icon: iconList[item.key],
                    children: renderMenu(item.children),
                };
            }
            return checkPagePermission(item) &&
                {
                    label: item.title,
                    key: item.key,
                    icon: iconList[item.key],
                };
        });
    };
    // 刷新后得到用户之前选中的
    const selectKeys = [props.location.pathname]
    const openKeys = ["/" + props.location.pathname.split("/")[1]]
    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div className="Menu">
                <div className='logo'>新闻发布管理系统</div>
                <div className="MenuList">
                    <Menu
                        // selectedKeys.key 当前选中的菜单项 key值
                        onClick={(selectedKeys) => {
                            props.history.push(selectedKeys.key);
                        }}
                        selectedKeys={selectKeys}
                        defaultOpenKeys={openKeys}
                        theme='dark'
                        mode='inline'
                        items={renderMenu(menu)}
                    />
                </div>
            </div>
        </Sider>
    );
}

export default withRouter(SideMenu);
