
// Set config defaults when creating the instance
import axios, {AxiosInstance} from "axios";

//定义我们需要向哪个域名发送请求 其实这里可以想象成 axios是一个类 而myAxios是一个对象
const myAxios: AxiosInstance = axios.create({
    // baseURL: 'http://10.1.2.184:8080/api',
    baseURL: 'https://mf.container.colinxu.cn//api',
    withCredentials: true
});

// axios.defaults.withCredentials = true;// 向后台发送请求时 axios携带Cookie凭证


// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    console.log("我要发请求了",config)
    // Do something before request is sent

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    console.log("我收到你的响应了",response)
    // Do something with response data
    // 未登录则跳转到登录页
    if (response?.data?.code === 40100) {
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

//导出axios
export default myAxios;

