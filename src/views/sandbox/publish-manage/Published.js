import React from "react";
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import usePublish from "../../../components/publish-manage/usePublish/usePublish";
import {Button} from "antd";

function Published() {
    // 2 已发布
    const {dataSource, handleSunset} = usePublish(2);
    return (
        <div>
            <NewsPublish
                dataSource={dataSource}
                button={
                    (id) =>
                        <Button
                            danger
                            onClick={() => handleSunset(id)}
                        >下线</Button>
                }
            />
        </div>
    );
}

export default Published;