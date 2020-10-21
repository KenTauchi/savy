import React, { useState, useEffect } from "react";
import Header from '../header/header';
import Footer from '../footer/footer';
import Filter from './filter/Filter.component';
import LocationList from './locationList/LocationList.component';
import GoogleMap from './google-map/GoogleMap.component';
import RecyclingFacts from './recycling-fact/recycling-fact';
import ExploreQuiz from './explore-quiz/explore-quiz';

const WasteManagement = () => {
    const [defaultProps, setDefaultProps] = useState({
      center: {
        lat: 49.2246,
        lng: -123.1087,
      },
      zoom: 11,
    });

    const [locations, setLocations] = useState(
        [
            {
                id: "frrafra",
                name: "UBC",
                lat: 49.2606,
                lng: -123.246,
                phone: "(236)402-9393",
                address1: "1387 Richards Street",
                address2: "Vancouver, BC V6G 0B6",
                linkUrl: "recyclinglocationname.com",
                distance: "12.5",
            },
            {
                id: "efaefa",
                name: "Columbia Collage",
                lat: 49.2718,
                lng: -123.0953,
                phone: "(236)402-9393",
                address1: "1387 Richards Street",
                address2: "Vancouver, BC V6G 0B6",
                linkUrl: "recyclinglocationname.com",
                distance: "12.5",
            },
            {
                id: "moijorm",
                name: "Douglas College",
                lat: 49.2036,
                lng: -122.9127,
                phone: "(236)402-9393",
                address1: "1387 Richards Street",
                address2: "Vancouver, BC V6G 0B6",
                linkUrl: "recyclinglocationname.com",
                distance: "12.5",
            },
        ],
    );

    return (
      <div>
        <Header />
        <div className="content">
          <h1>Waste Management</h1>
          <Filter />
          <LocationList locations={locations} />
          <GoogleMap defaultProps={defaultProps} locations={locations} />
          <RecyclingFacts />
          <ExploreQuiz />
        </div>
        <Footer />
      </div>
    );
}

export default WasteManagement;