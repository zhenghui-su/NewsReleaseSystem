### 本项目适合新学习React的初学者练手

技术栈如下:

The technology stack is as follows:

+ React 18 React 18 版本
+ create-react-app 脚手架
+ redux 状态管理
+ Axios 请求库和拦截器
+ useYourHook 自定义hook
+ Ant Design 组件库
+ ESLint + Prettier 前端工程化
+ tsparticles 粒子效果图
+ Echarts 可视化库
+ Draft 富文本编辑器

1. 本系统大量运用antd组件，同时包含了router，redux管理，优化了一些弃用的antd
2. 本系统更改了原代码运用connect，改为运用钩子函数
3. 本系统一些组件运用富文本编辑器库，登录界面运用粒子效果库
4. 本系统运用了axios请求拦截器来显示加载动画(因网络数据请求过慢)


1. This system makes extensive use of antd components, including router, redux management, and optimizes some deprecated
   antd
2. This system changes the original code to use connect, instead of using hook functions
3. Some components of the system use the rich text editor library, and the login interface uses the particle effect
   library
4. The system uses axios request blocker to display loading animation (due to slow network data request).

### 这是一个通用的后台新闻系统，以前端为主，后端用json-serve模拟,端口号为5000

This is a general purpose background news system, front-end oriented, back-end emulated with json-serve, port number
5000

### 如何学习？

先create-react-app创建后，可依据哔哩哔哩千峰视频的顺序练习

After creating create-react-app, you can practice according to the sequence of Bilibili Qianfeng video

### 如何启动项目？

git clone后在终端输入yarn安装依赖，然后输入`yarn run start`即可启动

After git clone, enter yarn to install the dependency on the terminal, and enter `yarn run start` to start the operation

### 如何启动json-server How to start json-server?

你只需在db.json文件所在目录，打开命令行窗口，输入如下代码

Just open a command line window in the directory where the db.json file resides and enter the following code

```bash
json-server --watch ./db.json --port 5000
```