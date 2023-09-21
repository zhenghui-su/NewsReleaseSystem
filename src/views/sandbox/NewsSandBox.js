/*
 * @Author: suzhenghui 343196323@qq.com
 * @Date: 2023-09-12 23:05:19
 * @LastEditors: suzhenghui 343196323@qq.com
 * @LastEditTime: 2023-09-14 00:41:16
 * @FilePath: \newssystem\src\views\NewsSandBox\NewsSandBox.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import SideMenu from "../../components/sandbox/SideMenu/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader/TopHeader";
import {Route, Switch} from "react-router-dom";
import Home from "./home/Home";
import UserList from "./user-manage/UserList";
import RoleList from "./right-manage/RoleList";
import RightList from "./right-manage/RightList";
import {Redirect} from "react-router";
import NoPermission from "./nopermission/NoPermission";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import './NewsSandBox.css'

function NewsSandBox() {
    return (
        <Layout>
            {/*侧边栏*/}
            <SideMenu/>

            <Layout className="site-layout">
                {/*头部*/}
                <TopHeader/>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: "auto"
                    }}
                >
                    {/*路由*/}
                    <Switch>
                        <Route path={"/home"} component={Home}/>
                        <Route path={"/user-manage/list"} component={UserList}/>
                        <Route path={"/right-manage/role/list"} component={RoleList}/>
                        <Route path={"/right-manage/right/list"} component={RightList}/>
                        <Redirect from={"/"} to={"home"} exact/>
                        <Route path={"*"} component={NoPermission}/>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

export default NewsSandBox;
