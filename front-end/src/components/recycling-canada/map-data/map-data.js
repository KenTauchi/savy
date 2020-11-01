import React from "react";
import "./map-data.scss";

import { useSelector } from "react-redux";
import { getDataSet } from "../../../reducks/mapChartData/selectors";

const MapData = () => {
  const selector = useSelector((state) => state);
  const mapTableData = getDataSet(selector);
  const table = mapTableData.mapDataTable;

  return (
    <div className="map-data-section">
      <ul>
        <li className="table-data">
          <span>
            {table.prov_RecyclingContribPerc
              ? table.prov_RecyclingContribPerc
              : "0"}
            %
          </span>
          <span>Contribution</span>
        </li>
        <li className="table-data">
          <span>
            {table.prov_WasteRecyclingPerc
              ? table.prov_WasteRecyclingPerc
              : "0"}
          </span>
          <span>Waste Recycled</span>
        </li>
        <li className="table-data">
          <span>{table.prov_Rank ? table.prov_Rank : "0"}</span>
          <span>Province Rank</span>
        </li>
      </ul>
    </div>
  );
};

export default MapData;
