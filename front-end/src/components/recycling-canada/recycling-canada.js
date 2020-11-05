import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import About from "./about/about";
import Feature from "./feature/feature";
import Map from "./map/map";
import SvgMap from "./svgmap/SvgMap";
import MapData from "./map-data/map-data";
import Team from "./team/team";
import Testimonial from "./testimonial/testimonial";

const RecyclingCanada = () => {
  return (
    <div>
      <Header />
      <div className="content">
        <SvgMap />
        <MapData />
        <About />
        <Feature />
        <Testimonial />
        <Team />
      </div>
      <Footer />
    </div>
  );
};

export default RecyclingCanada;
