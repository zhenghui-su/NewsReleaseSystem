import React from "react";
import usePublish from "../../../components/publish-manage/usePublish/usePublish";
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import {Button} from "antd";

function Sunset() {
    // 3 已下线
    const {dataSource, handleDelete} = usePublish(3);
    return (
        <div>
            <NewsPublish
                dataSource={dataSource}
                button={
                    (id) =>
                        <Button
                            danger
                            onClick={() => handleDelete(id)}
                        >删除</Button>
                }
            />
        </div>
    );
}

export default Sunset;