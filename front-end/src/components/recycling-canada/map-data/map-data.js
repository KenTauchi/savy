import React from "react";

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
            <img
              className="map-data-img"
              src="./images/icons/waste-recycled.svg"
              alt=""
            />
          </span>
          <span className="map-data-value">
            {table.prov_WasteRecyclingPerc
              ? table.prov_WasteRecyclingPerc + " %"
              : "0"}
          </span>
          <span>Waste Recycled</span>
        </li>
        <li className="table-data">
          <span>
            <img
              className="map-data-img"
              src="./images/icons/contribution.svg"
              alt=""
            />
          </span>
          <span className="map-data-value">
            {table.prov_RecyclingContribPerc
              ? table.prov_RecyclingContribPerc + " %"
              : "0"}
          </span>
          <span>Contribution</span>
        </li>

        <li className="table-data">
          <span>
            <img
              className="map-data-img"
              src="./images/icons/province-rank.svg"
              alt=""
            />
          </span>
          <span className="map-data-value">
            {table.prov_Rank ? table.prov_Rank : "0"}
          </span>
          <span>Province Rank</span>
        </li>
        <li className="table-data">
          <span>
            <img
              className="map-data-img"
              src="./images/icons/province-rank.svg"
              alt=""
            />
          </span>
          <span className="map-data-value">
            {table.prov_Population_Rank ? table.prov_Population_Rank : "0"}
          </span>
          <span className="data-table-title">Population Contirbution Rank</span>
        </li>
        <li className="table-data">
          <span>
            <img
              className="map-data-img"
              src="./images/icons/province-rank.svg"
              alt=""
            />
          </span>
          <span className="map-data-value">
            {table.prov_Industries ? table.prov_Industries : "0"}
          </span>
          <span>Industries</span>
        </li>
        <li className="table-data">
          <span>
            <img
              className="map-data-img"
              src="./images/icons/province-rank.svg"
              alt=""
            />
          </span>
          <span className="map-data-value">
            {table.prov_Employees ? table.prov_Employees.toLocaleString() : "0"}
          </span>
          <span>Employees</span>
        </li>
      </ul>
    </div>
  );

};

export default MapData;
