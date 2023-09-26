import React from "react";
import {Header} from "antd/es/layout/layout";
import {
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, PoweroffOutlined,
    SmileOutlined,
    UserOutlined
} from "@ant-design/icons";
import Dropdown from "antd/es/dropdown/dropdown";
import {Space} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {withRouter} from "react-router";
import {useDispatch, useSelector} from "react-redux";

//头部栏
function TopHeader(props) {
    // const [collapsed, setCollapsed] = useState(false);
    const isCollapsed = useSelector(state => state.CollapsedReducer.isCollapsed);
    const dispatch = useDispatch();

    const changeCollapsed = () => {
        // 改变state的isCollapsed
        // console.log(props);
        // dispatch 通过connect接管
        // props.changeCollapsed();
        // 利用useDispatch()管理
        dispatch({type: "change_collapsed"});
    };

    const {role: {roleName}, username} = JSON.parse(localStorage.getItem("token"));

    const items = [
        {
            key: "1",
            label: (
                <span>{roleName}</span>
            ),
            icon: <SmileOutlined/>,
        },
        {
            key: "2",
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
        <Header className="site-layout-background" style={{padding: "0 16px"}}>
            {
                isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}/> :
                    <MenuFoldOutlined onClick={changeCollapsed}/>
            }
            <div style={{float: "right"}}>
                <span>欢迎<span style={{color: "#1890ff"}}>{username}</span>回来</span>
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <Space>
                        <Avatar
                            style={{
                                backgroundColor: "#6AE2D6FF",
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

/**
 * 一般用于类组件，可以采用装饰器写法：@connect
 * connect(
 *  // mapStateToProps
 *  // mapDispatchToProps
 * )(被包装的组件)
 *
 */

/* connect方法链接redux
   isCollapsed保存在state.CollapsedReducer.isCollapsed
const mapStateToProps = ({CollapsedReducer: {isCollapsed}}) => {
    return {
        isCollapsed
    };
};
const mapDispatchToProps = {
    // 只要调用这个方法就表示dispatch
    changeCollapsed() {
        return {
            type: "change_collapsed"
        };
    }
};
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopHeader));
*/

export default withRouter(TopHeader);
