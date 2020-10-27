import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getDataSet } from "../../../reducks/mapChartData/selectors";
import {
  clickGet,
  dataImportAction,
} from "../../../reducks/mapChartData/action";
// import { dataFetch } from "../../../reducks/mapChartData/operations"

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_region_canada from "@amcharts/amcharts4-geodata/canadaLow";

am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;

export default function Map() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const dataSet = getDataSet(selector);
  console.log(selector);

  useEffect(() => {
    console.log("amchrts data rendered");

    let chart = am4core.create("chartdiv", am4maps.MapChart);

    chart.dataSource.updateCurrentData = true;

    chart.responsive.enabled = true;

    // Set map definition

    try {
      chart.geodata = am4geodata_region_canada;
    } catch (e) {
      chart.raiseCriticalError(
        new Error(
          'Map geodata could not be loaded. Please download the latest <a href="https://www.amcharts.com/download/download-v4/">amcharts geodata</a> and extract its contents into the same directory as your amCharts files.'
        )
      );
    }

    // Set projection
    chart.projection = new am4maps.projections.Mercator();
    // chart.projection = new am4maps.projections.Miller();

    // zoomout on background click
    chart.chartContainer.background.events.on("hit", function () {
      zoomOut();
      polygonTemplate.properties.fillOpacity = 1;
    });

    let colorSet = new am4core.ColorSet();
    let morphedPolygon;

    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.data = dataSet.data;

    //Set min/max fill color for each area
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: chart.colors.getIndex(1).brighten(1),
      max: chart.colors.getIndex(1).brighten(-0.3),
    });

    // Make map load polygon data (state shapes and names) from GeoJSON
    polygonSeries.useGeodata = true;

    // Set up heat legend
    // let heatLegend = chart.createChild(am4maps.HeatLegend);
    // heatLegend.series = polygonSeries;
    // heatLegend.align = "right";
    // heatLegend.width = am4core.percent(25);
    // heatLegend.marginRight = am4core.percent(4);
    // heatLegend.minValue = 0;
    // heatLegend.maxValue = 40000000;
    // heatLegend.valign = "bottom";

    // Set up custom heat map legend labels using axis ranges
    // let minRange = heatLegend.valueAxis.axisRanges.create();
    // minRange.value = heatLegend.minValue;
    // minRange.label.text = "Little";
    // let maxRange = heatLegend.valueAxis.axisRanges.create();
    // maxRange.value = heatLegend.maxValue;
    // maxRange.label.text = "A lot!";

    // Blank out internal heat legend value axis labels
    // heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function (
    //   labelText
    // ) {
    //   return "";
    // });

    // Configure series tooltip
    let polygonTemplate = polygonSeries.mapPolygons.template;
    // polygonTemplate.tooltipText = "{name}: {value}";
    // polygonTemplate.tooltipText = "{name}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;

    polygonTemplate.events.on("hit", function (event) {
      // event.target.zIndex = 1000000;
      // selectPolygon(event.target);
      console.log(event.target.dataItem.dataContext.id);

      let province = event.target.dataItem.dataContext.name;
      let contribution;
      let wasteRecycled;
      let provinceRank;

      let found = dataSet.data.find((prov) =>
        prov.mapData ? prov.mapData.provinceName === province : false
      );
      console.log("found", found);

      if (found) {
        contribution = found.mapData.prov_RecyclingContribPerc;
        wasteRecycled = found.mapData.prov_TotalRecycling;
        provinceRank = found.mapData.prov_WasteRecyclingPerc;
      } else {
        contribution = "Not Avaialble";
        wasteRecycled = "Not Avaialble";
        provinceRank = "Not Avaialble";
      }

      dispatch(clickGet(contribution, wasteRecycled, provinceRank));
    });

    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(1).brighten(-0.5);

    // ====================================================================

    // desaturate filter for countries
    let desaturateFilter = new am4core.DesaturateFilter();
    desaturateFilter.saturation = 0.25;
    polygonTemplate.filters.push(desaturateFilter);

    // take a color from color set
    polygonTemplate.adapter.add("fill", function (fill, target) {
      return colorSet.getIndex(target.dataItem.index + 1);
    });

    // set fillOpacity to 1 when hovered
    let hoverState = polygonTemplate.states.create("hover");
    hoverState.properties.fillOpacity = 1;

    // what to do when country is clicked
    polygonTemplate.events.on("hit", function (event) {
      event.target.zIndex = 1000000;
      selectPolygon(event.target);
    });

    // Pie chart
    let pieChart = chart.seriesContainer.createChild(am4charts.PieChart);
    // Set width/heigh of a pie chart for easier positioning only
    pieChart.width = 100;
    pieChart.height = 100;
    pieChart.hidden = true; // can't use visible = false!

    // because defauls are 50, and it's not good with small countries
    pieChart.chartContainer.minHeight = 1;
    pieChart.chartContainer.minWidth = 1;

    let pieSeries = pieChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "category";

    pieSeries.data = {
      "CA-BC": [
        { value: 20, category: "First" },
        { value: 20, category: "Second" },
        { value: 10, category: "Third" },
      ],
    };

    let dropShadowFilter = new am4core.DropShadowFilter();
    dropShadowFilter.blur = 4;
    pieSeries.filters.push(dropShadowFilter);

    let sliceTemplate = pieSeries.slices.template;
    sliceTemplate.fillOpacity = 1;
    sliceTemplate.strokeOpacity = 0;

    let activeState = sliceTemplate.states.getKey("active");
    activeState.properties.shiftRadius = 0; // no need to pull on click, as country circle under the pie won't make it good

    let sliceHoverState = sliceTemplate.states.getKey("hover");
    sliceHoverState.properties.shiftRadius = 0; // no need to pull on click, as country circle under the pie won't make it good

    // we don't need default pie chart animation, so change defaults
    let hiddenState = pieSeries.hiddenState;
    hiddenState.properties.startAngle = pieSeries.startAngle;
    hiddenState.properties.endAngle = pieSeries.endAngle;
    hiddenState.properties.opacity = 0;
    hiddenState.properties.visible = false;

    // series labels
    let labelTemplate = pieSeries.labels.template;
    labelTemplate.nonScaling = true;
    labelTemplate.fill = am4core.color("#FFFFFF");
    labelTemplate.fontSize = 10;
    labelTemplate.background = new am4core.RoundedRectangle();
    labelTemplate.background.fillOpacity = 0.9;
    labelTemplate.padding(4, 9, 4, 9);
    labelTemplate.background.fill = am4core.color("#7678a0");

    // we need pie series to hide faster to avoid strange pause after country is clicked
    pieSeries.hiddenState.transitionDuration = 200;

    // country label
    let countryLabel = chart.chartContainer.createChild(am4core.Label);
    countryLabel.text = "Click a Province";
    countryLabel.fill = am4core.color("#7678a0");
    countryLabel.fontSize = 40;

    countryLabel.hiddenState.properties.dy = 1000;
    countryLabel.defaultState.properties.dy = 0;
    countryLabel.valign = "middle";
    countryLabel.align = "right";
    countryLabel.paddingRight = 50;
    countryLabel.hide(0);
    countryLabel.show();

    // select polygon
    function selectPolygon(polygon) {
      if (morphedPolygon != polygon) {
        let animation = pieSeries.hide();
        if (animation) {
          animation.events.on("animationended", function () {
            morphToCircle(polygon);
          });
        } else {
          morphToCircle(polygon);
        }
      }
    }

    // fade out all countries except selected
    function fadeOut(exceptPolygon) {
      for (let i = 0; i < polygonSeries.mapPolygons.length; i++) {
        let polygon = polygonSeries.mapPolygons.getIndex(i);
        if (polygon != exceptPolygon) {
          polygon.defaultState.properties.fillOpacity = 0.5;
          polygon.animate(
            [
              { property: "fillOpacity", to: 0.5 },
              { property: "strokeOpacity", to: 1 },
            ],
            polygon.polygon.morpher.morphDuration
          );
        }
      }
    }

    function zoomOut() {
      if (morphedPolygon) {
        pieSeries.hide();
        morphBack();
        fadeOut();
        countryLabel.hide();
        morphedPolygon = undefined;
      }
    }

    function morphBack() {
      if (morphedPolygon) {
        morphedPolygon.polygon.morpher.morphBack();
        let dsf = morphedPolygon.filters.getIndex(0);
        dsf.animate(
          { property: "saturation", to: 0.25 },
          morphedPolygon.polygon.morpher.morphDuration
        );
      }
    }

    function morphToCircle(polygon) {
      let animationDuration = polygon.polygon.morpher.morphDuration;
      // if there is a country already morphed to circle, morph it back
      morphBack();
      // morph polygon to circle
      polygon.toFront();
      polygon.polygon.morpher.morphToSingle = true;
      let morphAnimation = polygon.polygon.morpher.morphToCircle();

      polygon.strokeOpacity = 0; // hide stroke for lines not to cross countries

      polygon.defaultState.properties.fillOpacity = 1;
      polygon.animate({ property: "fillOpacity", to: 1 }, animationDuration);

      // animate desaturate filter
      let filter = polygon.filters.getIndex(0);
      filter.animate({ property: "saturation", to: 1 }, animationDuration);

      // save currently morphed polygon
      morphedPolygon = polygon;

      // fade out all other
      fadeOut(polygon);

      // hide country label
      countryLabel.hide();

      if (morphAnimation) {
        morphAnimation.events.on("animationended", function () {
          zoomToCountry(polygon);
        });
      } else {
        zoomToCountry(polygon);
      }
    }

    function zoomToCountry(polygon) {
      let zoomAnimation = chart.zoomToMapObject(polygon, 2.2, true);
      if (zoomAnimation) {
        zoomAnimation.events.on("animationended", function () {
          showPieChart(polygon);
        });
      } else {
        showPieChart(polygon);
      }
    }

    function showPieChart(polygon) {
      polygon.polygon.measure();
      let radius =
        ((polygon.polygon.measuredWidth / 2) * polygon.globalScale) /
        chart.seriesContainer.scale;
      pieChart.width = radius * 2;
      pieChart.height = radius * 2;
      pieChart.radius = radius;

      let centerPoint = am4core.utils.spritePointToSvg(
        polygon.polygon.centerPoint,
        polygon.polygon
      );
      centerPoint = am4core.utils.svgPointToSprite(
        centerPoint,
        chart.seriesContainer
      );

      pieChart.x = centerPoint.x - radius;
      pieChart.y = centerPoint.y - radius;

      let fill = polygon.fill;
      let desaturated = fill.saturate(0.3);
      console.log(pieSeries.dataItems);
      for (let i = 0; i < pieSeries.dataItems.length; i++) {
        let dataItem = pieSeries.dataItems.getIndex(i);
        dataItem.value = Math.round(Math.random() * 100);
        dataItem.slice.fill = am4core.color(
          am4core.colors.interpolate(
            fill.rgb,
            am4core.color("#ffffff").rgb,
            0.2 * i
          )
        );

        dataItem.label.background.fill = desaturated;
        dataItem.tick.stroke = fill;
      }
      // let dataItem = pieSeries.dataItems;
      // dataItem.value = myData[polygon.dataItem.dataContext.id].value;
      // dataItem.slice.fill = am4core.color(
      //   am4core.colors.interpolate(
      //     fill.rgb,
      //     am4core.color("#ffffff").rgb,
      //     0.2 * 1
      //   )
      // );

      pieSeries.show();
      pieChart.show();

      countryLabel.text = "{name}";
      countryLabel.dataItem = polygon.dataItem;
      countryLabel.fill = desaturated;
      countryLabel.show();
    }
  }, [dataSet.data]);

  useEffect(() => {
    let provDataArr = [];
    console.log("API data fetch rendered");

    // fetch("https://cors-anywhere.herokuapp.com/" +
    //       "https://api.covid19tracker.ca/provinces")

    fetch("http://localhost:3000/api/v1/mapdata")
      .then((response) => response.json())
      .then((result) => {
        dispatch(dataImportAction(result));
      })
      .catch(() => null);
  }, []);

  return (
    <div className="map-section">
      <div id="chartdiv" style={{ width: "100%", height: "30vw" }}></div>
    </div>
  );
}
