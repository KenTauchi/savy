import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataSet } from "../../../../reducks/mapChartData/selectors";
// import {
//   clickGet,
//   dataImportAction,
// } from "../../../reducks/mapChartData/action";

import "./piechart.scss";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { polyline } from "@amcharts/amcharts4/.internal/core/rendering/Path";

const PieChart = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const dataSet = getDataSet(selector);
  const pieData = dataSet.pieChartData;

  useEffect(() => {
    console.log("pieChart UseEffect");
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("chartdiv", am4charts.PieChart);
    // chart.responsive.enabled = true;
    chart.data = pieData;

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "familyPercent";
    pieSeries.dataFields.category = "familyName";
    pieSeries.slices.template.stroke = am4core.color("#fff"); //color of piechart inner strole
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 0.5;

    let sliceTemplate = pieSeries.slices.template;
    sliceTemplate.fillOpacity = 0.9;
    sliceTemplate.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    let dropShadowFilter = new am4core.DropShadowFilter();
    dropShadowFilter.blur = 4;
    pieSeries.filters.push(dropShadowFilter);

    let labelTemplate = pieSeries.labels.template;
    labelTemplate.nonScaling = true;
    labelTemplate.fill = am4core.color("#FFFFFF");
    labelTemplate.fontSize = 15;
    labelTemplate.background = new am4core.RoundedRectangle();
    labelTemplate.background.fillOpacity = 0.9;
    labelTemplate.padding(2, 9, 2, 9);
    labelTemplate.background.fill = am4core.color("#0d9445");
  });

  return (
    <div className="piechart">
      <div id="chartdiv"></div>
    </div>
  );
};

export default PieChart;
