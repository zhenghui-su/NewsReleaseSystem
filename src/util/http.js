import axios from "axios";
import {store} from "../redux/store/store";

// 基本路径头
axios.defaults.baseURL = "http://localhost:5000";

// axios拦截器  请求前执行
axios.interceptors.request.use(function (config) {
    // 显示loading
    // dispatch管理
    store.dispatch({
        type: "change_loading",
        payload: true,
    });
    return config;
}, function (error) {
    return Promise.reject(error);
});

// axios拦截器  请求后执行
axios.interceptors.response.use(function (response) {
    //隐藏loading
    store.dispatch({
        type: "change_loading",
        payload: false,
    });
    return response;
}, function (error) {

    //隐藏loading
    store.dispatch({
        type: "change_loading",
        payload: false,
    });
    return Promise.reject(error);
});
