import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSearchedMaterialFact } from '../../../reducks/locations/selectors';


// import './RecyclingFacts.style.scss';

const RecyclingFacts = () => {
  const state = useSelector(state => state);
  const fact = getSearchedMaterialFact(state);

  console.log(fact);

  const history = useHistory();

  return (
    <div className="fact-section">
      <div className="factHeadDiv">
        <h2>{fact.materialName}</h2>
        <p>
          {fact.description}
        </p>
      </div>
      <div className="factImageDiv">
        <img
          className="factWasteImage"
          src="https://images.unsplash.com/photo-1598048145816-4d54a3af68fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80"
          alt="Waste Image"
        />
        <p className="factRecyclingNotes">Recycling Notes:</p>
        <p>
          {fact.deliveryNotes}
        </p>
      </div>

      <div className="factFootDiv">
        <h2>Recycling Facts</h2>
        <p>
          {fact.recyclingFact}
        </p>
        <button 
          className="factExploreButton" 
          onClick={() => history.push("/explore")}
        >Explore</button>
      </div>
    </div>
  );
}

export default RecyclingFacts;