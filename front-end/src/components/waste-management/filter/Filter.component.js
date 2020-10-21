import React from 'react';
import './Filter.style.scss';

const Filter = () => {
    return (
      <div className="filter-section">
        <h2 className="WMpageH2">Welcome to savy recycling search!</h2>
        <p className="searchInstructionText">
          Search recycling solutions near you and get to know more about
          materials
        </p>
        <div className="WMpageInputsDiv">
          <div className="searchInput">
            <input
              id="materialSearch"
              type="text"
              placeholder="Item / Material name"
            />
          </div>
          <div className="searchInput">
            <input id="zipSearch"
                   type="text"
                   placeholder="ZIP code" />
          </div>
        </div>
      </div>
    );
}

export default Filter;