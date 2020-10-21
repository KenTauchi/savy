import React from 'react';
import './Filter.style.scss';

const Filter = () => {
    return (
      <div className="filter-section">
        <h2 className="WMpageH2">Welcome to savy recycling search!</h2>
        <p>
          Search recycling solutions near you and get to know more about
          materials
        </p>
        <div className="WMpageInputsDiv">
          <input
            id="materialSearch"
            type="text"
            placeholder="Item / Material name"
          />
          <input id="zipSearch"
                 type="text"
                 placeholder="ZIP code" />
        </div>
      </div>
    );
}

export default Filter;