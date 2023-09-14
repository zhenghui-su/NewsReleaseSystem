/*
 * @Author: suzhenghui 343196323@qq.com
 * @Date: 2023-09-12 22:49:10
 * @LastEditors: suzhenghui 343196323@qq.com
 * @LastEditTime: 2023-09-14 00:39:59
 * @FilePath: \newssystem\src\router\IndexRouter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import {HashRouter, Redirect, Switch} from 'react-router-dom';
import {Route} from 'react-router-dom/cjs/react-router-dom.min';
import Login from '../views/login/Login';
import NewsSandBox from '../views/sandbox/NewsSandBox';

function IndexRouter() {
    return (
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path={'/'} render={() =>
                    localStorage.getItem("token") ?
                        <NewsSandBox/> : <Redirect to={"/login"}/>

                }/>
            </Switch>
        </HashRouter>
    );
}

export default IndexRouter;
