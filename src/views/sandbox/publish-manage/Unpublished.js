import React from "react";
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import usePublish from "../../../components/publish-manage/usePublish/usePublish";
import {Button} from "antd";

function Unpublished() {
    // 1 待发布
    const {dataSource, handlePublish} = usePublish(1);
    return (
        <div>
            <NewsPublish
                dataSource={dataSource}
                button={
                    (id) => <Button type={"primary"} onClick={() => handlePublish(id)}>发布</Button>
                }
            />
        </div>
    );
}

export default Unpublished;