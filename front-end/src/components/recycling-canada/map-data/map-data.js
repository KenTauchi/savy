import { repeat } from "@amcharts/amcharts4/.internal/core/utils/String";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDataSet } from "../../../reducks/mapChartData/selectors";

const MapData = () => {
  const selector = useSelector((state) => state);
  const mapTableData = getDataSet(selector);
  const table = mapTableData.mapDataTable;
  //   console.log("province", table);

  const minMinStyle = {
    gridTemplateColumns: "repeat(2, 1fr)",
  };
  const minMidStyle = {
    gridTemplateColumns: "repeat(3, 1fr)",
  };
  const minMidAltStyle = {
    gridTemplateColumns: "repeat(4, 1fr)",
  };
  const minMaxStyle = {
    gridTemplateColumns: "repeat(6, 1fr)",
  };

  const [width, setWidth] = useState(0);
  const updateSize = () => setWidth(window.innerWidth);

  const ulStyle = () =>
    width < 700
      ? minMinStyle
      : width > 700 && width < 1024
      ? minMidStyle
      : width > 1024 && table.prov_Rank <= 0
      ? minMidStyle
      : minMaxStyle;

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
  }, [width]);

  return (
    <div className="map-data-section">
      <h2>{table.provinceName}</h2>
      <ul style={ulStyle()}>
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

        {table.provinceName === "Canada" ? null : (
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
        )}

        {/* Province Rank */}

        {table.provinceName === "Canada" ? null : (
          <li className="table-data">
            <span>
              <img
                className="map-data-img"
                src="./images/icons/province-rank.svg"
                alt=""
              />
            </span>
            <span className="map-data-value">{table.prov_Rank}</span>
            <span className="data-table-title">Province Rank</span>
          </li>
        )}

        {/* Population Contirbution Rank */}

        {table.provinceName === "Canada" ? null : (
          <li className="table-data">
            <span>
              <img
                className="map-data-img"
                src="./images/icons/population-contribution-rank.svg"
                alt=""
              />
            </span>
            <span className="map-data-value">{table.prov_Population_Rank}</span>
            <span className="data-table-title">
              Population Contirbution Rank
            </span>
          </li>
        )}

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
