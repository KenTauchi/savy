import React from "react";
import "./map-data.scss";

import { useSelector } from "react-redux";
import { getDataSet } from "../../../reducks/mapChartData/selectors";

const MapData = () => {
  const selector = useSelector((state) => state);
  const tableData = getDataSet(selector);
  // console.log(tableData)
  return (
    <div className="map-data-section">
      <ul>
        <li className="table-data">
          <span>
            {tableData.mapDataTable.contribution
              ? tableData.mapDataTable.contribution
              : "0"}
            %
          </span>
          <span>Contribution</span>
        </li>
        <li className="table-data">
          <span>
            {tableData.mapDataTable.wasteRecycled
              ? tableData.mapDataTable.wasteRecycled.toLocaleString()
              : "0"}
          </span>
          <span>Waste Recycled</span>
        </li>
        <li className="table-data">
          <span>
            {tableData.mapDataTable.provinceRank
              ? tableData.mapDataTable.provinceRank
              : "0"}
          </span>
          <span>Province Rank</span>
        </li>
      </ul>
    </div>
  );
};

export default MapData;
