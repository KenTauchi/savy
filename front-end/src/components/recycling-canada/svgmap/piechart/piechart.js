import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getDataSet } from "../../../../reducks/mapChartData/selectors";
// import {
//   clickGet,
//   dataImportAction,
// } from "../../../reducks/mapChartData/action";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const PieChart = () => {
  // const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const dataSet = getDataSet(selector);
  const pieData = dataSet.pieChartData;
  console.log(pieData);

  const [width, setWidth] = useState(0);
  const updateSize = () => setWidth(window.innerWidth);

  useEffect(() => {
    am4core.useTheme(am4themes_animated);
    am4core.options.autoDispose = true;
    let chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.responsive.enabled = true;
    chart.data = pieData;

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "familyPercent";
    pieSeries.dataFields.category = "familyName";
    pieSeries.slices.template.stroke = am4core.color("#fff"); //color of piechart inner stroke
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 0.5;

    let sliceTemplate = pieSeries.slices.template;
    sliceTemplate.fillOpacity = 0.9;
    sliceTemplate.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    // let dropShadowFilter = new am4core.DropShadowFilter();
    // dropShadowFilter.blur = 4;
    // pieSeries.filters.push(dropShadowFilter);

    let labelTemplate = pieSeries.labels.template;
    labelTemplate.nonScaling = true;
    labelTemplate.fill = am4core.color("#FFFFFF");
    labelTemplate.background = new am4core.RoundedRectangle();
    labelTemplate.background.fillOpacity = 0.9;
    labelTemplate.background.fill = am4core.color("#05C4A3");

    // let found = pieData.forEach(
    //   (p) =>
    //     (labelTemplate.background.fill =
    //       p.familyName === "Organic"
    //         ? am4core.color("#0d9445")
    //         : p.familyName === "Plastic"
    //         ? am4core.color("#F15a22")
    //         : p.familyName === "Paper"
    //         ? am4core.color("#05C4A3")
    //         : am4core.color("#FFFFFF"))
    // );

    // =====================================================
    // ==========To make the pie chart Resonsive ===========
    // =====================================================

    window.addEventListener("resize", updateSize);
    updateSize();
    let padVar = width > 550 ? 9 : 4;
    let padSide = width > 550 ? 4.5 : 2;

    // For the desktip view
    chart.radius = am4core.percent(width > 700 ? 95 : width / 9.5);
    labelTemplate.fontSize = width > 550 ? 16 : 14;
    labelTemplate.padding(padSide, padVar, padSide, padVar);

    // ====================================================
    // ====================================================
    // console.log(width);
    return () => window.removeEventListener("resize", updateSize);
  }, [width]);

  return (
    <div className="piechart">
      <div id="chartdiv"></div>
    </div>
  );
};

export default PieChart;
