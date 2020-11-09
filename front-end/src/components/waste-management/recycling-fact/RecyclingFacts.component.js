import React from 'react';
import { useSelector } from "react-redux";
import { getSearchedMaterialFact } from '../../../reducks/locations/selectors';


// import './RecyclingFacts.style.scss';

const RecyclingFacts = () => {
  const state = useSelector(state => state);
  const fact = getSearchedMaterialFact(state);

  // console.log(fact);

  return (
    <div className="fact-section">
      <div className="factHeadDiv">
        <h2>{fact.materialName ? fact.materialName : fact.familyName}</h2>
        <p>{fact.description}</p>
      </div>
      <div className="factImageDiv">
        <img
          className="factWasteImage"
          src="https://images.unsplash.com/photo-1598048145816-4d54a3af68fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80"
          alt="Material"
        />
      </div>

      <div className="notesDiv">
        <p className="factRecyclingNotes">Recycling Notes: </p>
        <p className="factRecyclingNotesText">{fact.deliveryNotes}</p>
      </div>

      <div className="factMainDiv">
        <h2>Recycling Facts</h2>
        <p>{fact.recyclingFact}</p>
      </div>
    </div>
  );
}

export default RecyclingFacts;