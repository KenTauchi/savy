import React from 'react';
import { useSelector } from "react-redux";
import { getSearchedMaterialFact } from '../../../reducks/search/selectors';


const RecyclingFacts = () => {
	const state = useSelector(state => state);
	const fact = getSearchedMaterialFact(state);

	const imagePath = "./images/materials/" + fact.imageName;

	return (
		<div className="fact-section">
			<div className="factHeadDiv">
				<h2>{fact.materialName ? fact.materialName : fact.familyName}</h2>
				{fact.binColor && fact.familyName ? (
					<p className="binInfo">
						This is a type of <span>{fact.familyName}</span> and it goes to{" "}
						<span>{fact.binColor} Bin</span>.
					</p>
				) : null}
				<p className="factDescription">{fact.description}</p>
			</div>
			<div className="factImageDiv">
				{fact.imageName ? (
					<img className="factWasteImage" src={imagePath} alt="Material" />
				) : (
						<p className="noImageText">No Image</p>
					)}
			</div>

			{fact.deliveryNotes ? (
				<div className="notesDiv">
					<p className="factRecyclingNotes">Recycling Notes: </p>
					<p className="factRecyclingNotesText">{fact.deliveryNotes}</p>
				</div>
			) : null}

			{fact.recyclingFact ? (
				<div className="factMainDiv">
					<h2>Recycling Facts</h2>
					<p>{fact.recyclingFact}</p>
				</div>
			) : null}
		</div>
	);
}

export default RecyclingFacts;