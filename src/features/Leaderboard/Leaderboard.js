import React, { useState, useEffect } from "react";
import {Table} from "antd";
import { api } from "../../api/Request";

function Leaderboard(factory, deps) {
    const [loadingData, setLoadingData] = useState(true);
    const columns =  [
        {
            title: "Student",
            key: "_id",
            dataIndex:"_id"
        },
        {
            title: "Total Stars",
            key: "total_stars",
            dataIndex:"total_stars"
        },
        {
            title: "Total Score",
            key: "total_score",
            dataIndex:"total_score"
        },
    ]

    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            await api.get('/get-leader')
                .then((response) => {
                    // check if the data is populated
                    console.log(response.data);
                    setData(response.data);
                    // you tell it that you had the result
                    setLoadingData(false);
                });
        }
        if (loadingData) {
            getData();
        }
    }, []);

    return (
        <div className="Leaderboard">
            {/* here you check if the state is loading otherwise if you wioll not call that you will get a blank page because the data is an empty array at the moment of mounting */}
            {loadingData ? (
                <p>Loading Please wait...</p>
            ) : (
                <Table columns={columns} dataSource={data} />
            )}
        </div>
    );
}

export default Leaderboard;