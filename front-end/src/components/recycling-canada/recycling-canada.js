import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import About from "./about/about";
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
        <h1>Recycling Canada</h1>
        <About />
        <SvgMap />
        <MapData />
        <Testimonial />
        <Team />
      </div>
      <Footer />
    </div>
  );
};

export default RecyclingCanada;
