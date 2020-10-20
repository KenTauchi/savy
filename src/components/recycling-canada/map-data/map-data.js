import React from 'react';
import "./map-data.scss"

import { useSelector } from "react-redux";
import { getDataTable } from "../../../reducks/mapChartData/selectors"

const MapData = () => {
    const selector = useSelector((state) => state);
    const tableData = getDataTable(selector)
    return (
        <div className="map-data-section">
            <ul>
                <li className="table-data">
                    <span>{tableData.contribution ? tableData.contribution : "0"}</span>
                    <span>Contribution</span>
                </li>
                <li className="table-data">
                    <span>{tableData.wasteRecycled ? tableData.wasteRecycled : "0"}</span>
                    <span>Waste Recycled</span>
                </li>
                <li className="table-data">
                    <span>{tableData.provinceRank ? tableData.provinceRank : "0"}</span>
                    <span>Province Rank</span>
                </li>
           
            </ul>
        </div>
    );
}

export default MapData;