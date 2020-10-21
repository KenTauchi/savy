import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Filter from './filter/filter';
import Location from './location/location';
import GoogleMap from './google-map/google-map';
import RecyclingFacts from './recycling-fact/recycling-fact';
import ExploreQuiz from './explore-quiz/explore-quiz';

const WasteManagement = () => {
    return (
        <div>
            <Header />
            <div className="content">
                <h1>Waste Management</h1>
                <Filter />
                <Location />
                <GoogleMap />
                <RecyclingFacts />
                <ExploreQuiz />
            </div>
            <Footer />
        </div>
    );
}

export default WasteManagement;