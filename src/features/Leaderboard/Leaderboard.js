import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import {Table} from "antd";

function Leaderboard(factory, deps) {
    const [loadingData, setLoadingData] = useState(true);
    const columns = useMemo(() => [
        {
            Header: "State",
            accessor: "state",
        },
        {
            Header: "Positive Cases",
            accessor: "positive",
        },
        {
            Header: "Recovered Cases",
            accessor: "recovered",
        },
    ], deps);

    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            await axios
                .get("https://covidtracking.com/api/v1/states/current.json")
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
                <Table columns={columns} data={data} />
            )}
        </div>
    );
}

export default Leaderboard;