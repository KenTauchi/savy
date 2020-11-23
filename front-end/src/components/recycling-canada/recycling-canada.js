import React from "react";
import About from "./about/about";
import Feature from "./feature/feature";
import Map from "./map/map";
import SvgMap from "./svgmap/SvgMap";
import MapData from "./map-data/map-data";
import Team from "./team/team";
import Testimonial from "./testimonial/testimonial";
import ContactSection from "./contact-section/contact-section";
// import Overlay from "../../components/recycling-canada/overlay/Overlay";

const RecyclingCanada = () => {
  return (
    <div className="main-content homepage-content">
      <SvgMap />
      <MapData />
      <About />
      <Feature />
      <Testimonial />
      <Team />
      <ContactSection />
    </div>
  );
};

export default RecyclingCanada;
