import React from "react";
import { useSelector } from "react-redux";
import { getDataSet } from "../../../reducks/mapChartData/selectors";

const MapData = () => {
  const selector = useSelector((state) => state);
  const mapTableData = getDataSet(selector);
  const table = mapTableData.mapDataTable;
  //   console.log("province", table);

  return (
    <div className="map-data-section">
      <h2>{table.provinceName}</h2>
      <ul>
        {/* Waste Recycled */}
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
              ? table.prov_WasteRecyclingPerc
              : "0"}
          </span>
          <span className="data-table-title">Waste Recycled (%)</span>
        </li>

        {/* Contribution (%) */}
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
              ? table.prov_RecyclingContribPerc
              : "0"}
          </span>
          <span className="data-table-title">Contribution (%)</span>
        </li>

        {/* Province Rank */}
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
          <span className="data-table-title">Province Rank</span>
        </li>

        {/* Population Contirbution Rank */}
        <li className="table-data">
          <span>
            <img
              className="map-data-img"
              src="./images/icons/population-contribution-rank.svg"
              alt=""
            />
          </span>
          <span className="map-data-value">
            {table.prov_Population_Rank ? table.prov_Population_Rank : "0"}
          </span>
          <span className="data-table-title">Population Contirbution Rank</span>
        </li>

        {/* Industries */}
        <li className="table-data">
          <span>
            <img
              className="map-data-img"
              src="./images/icons/industries.svg"
              alt=""
            />
          </span>
          <span className="map-data-value">
            {table.prov_Industries ? table.prov_Industries : "0"}
          </span>
          <span className="data-table-title">Industries</span>
        </li>

        {/* Employees */}
        <li className="table-data">
          <span>
            <img
              className="map-data-img"
              src="./images/icons/employees.svg"
              alt=""
            />
          </span>
          <span className="map-data-value">
            {table.prov_Employees ? table.prov_Employees.toLocaleString() : "0"}
          </span>
          <span className="data-table-title">Employees</span>
        </li>
      </ul>
    </div>
  );
};

export default MapData;
