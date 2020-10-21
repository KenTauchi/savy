import React, {useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
import { getDataSet } from "../../../reducks/mapChartData/selectors";
import { clickGet, dataImportAction } from "../../../reducks/mapChartData/action";
// import { dataFetch } from "../../../reducks/mapChartData/operations"


import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_region_canada from "@amcharts/amcharts4-geodata/canadaLow"

am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;

export default function Map() {

const dispatch = useDispatch();
const selector = useSelector((state) => state);
const dataSet = getDataSet(selector);
console.log(selector)



  useEffect(() => {
      console.log("amchrts data rendered")
  
    let chart = am4core.create("chartdiv", am4maps.MapChart);
  
    chart.dataSource.updateCurrentData = true
  
    chart.responsive.enabled = true;
  
    // Set map definition
  
      try {
        chart.geodata = am4geodata_region_canada;
      }
      catch (e) {
        chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
      }
  
    
    // Set projection
    chart.projection = new am4maps.projections.Mercator();
  
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
    let heatLegend = chart.createChild(am4maps.HeatLegend);
    heatLegend.series = polygonSeries;
    heatLegend.align = "right";
    heatLegend.width = am4core.percent(25);
    heatLegend.marginRight = am4core.percent(4);
    heatLegend.minValue = 0;
    heatLegend.maxValue = 40000000;
    heatLegend.valign = "bottom";
  
    // Set up custom heat map legend labels using axis ranges
    let minRange = heatLegend.valueAxis.axisRanges.create();
    minRange.value = heatLegend.minValue;
    minRange.label.text = "Little";
    let maxRange = heatLegend.valueAxis.axisRanges.create();
    maxRange.value = heatLegend.maxValue;
    maxRange.label.text = "A lot!";
  
    // Blank out internal heat legend value axis labels
    heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function (
      labelText
    ) {
      return "";
    });
  
    // Configure series tooltip
    let polygonTemplate = polygonSeries.mapPolygons.template;
    // polygonTemplate.tooltipText = "{name}: {value}";
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;
  
    polygonTemplate.events.on("over", function (event) {
      // event.target.zIndex = 1000000;
      // selectPolygon(event.target);
      let id = event.target.dataItem.dataContext.id;
     let province = event.target.dataItem.dataContext.name;
    
     let found = dataSet.data.find(prov => prov.id === id)
     let population = found.value
     console.log(population)
    
     dispatch(clickGet(population, population, population));
    })
  
    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(1).brighten(-0.5);
    
    }, [dataSet.data])

    useEffect(()=> {
        let provDataArr = [];
        console.log("API data fetch rendered")

        fetch("https://cors-anywhere.herokuapp.com/" +
              "https://api.covid19tracker.ca/provinces")
            .then((response) => response.json())
            .then(result => {
                result.forEach((prov) => {
                    let provId = "CA-" + prov.code;
                    let provVal = prov.population;
                    let provObj = {
                      id: provId,
                      value: provVal,
                    };                  
                    provDataArr.push(provObj);
                  }); 
                  dispatch(dataImportAction(provDataArr))
            })
            .catch(() => null);
           

    },[])


    return (
        <div className="map-section">
        <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>
        </div>
    );
}

