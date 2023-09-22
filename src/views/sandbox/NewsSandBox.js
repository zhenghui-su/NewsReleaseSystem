/*
 * @Author: suzhenghui 343196323@qq.com
 * @Date: 2023-09-12 23:05:19
 * @LastEditors: suzhenghui 343196323@qq.com
 * @LastEditTime: 2023-09-14 00:41:16
 * @FilePath: \newssystem\src\views\NewsSandBox\NewsSandBox.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {useEffect} from "react";
import SideMenu from "../../components/sandbox/SideMenu/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader/TopHeader";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import "./NewsSandBox.css";
import NewsRouter from "../../components/newsrouter/NewsRouter";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

function NewsSandBox() {
    NProgress.start();
    useEffect(() => {
        NProgress.done();
    });
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
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        overflow: "auto"
                    }}
                >
                    {/*路由*/}
                    <NewsRouter/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default NewsSandBox;
