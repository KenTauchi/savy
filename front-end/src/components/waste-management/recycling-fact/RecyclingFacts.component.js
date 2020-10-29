import React from 'react';

import './RecyclingFacts.style.scss';

const RecyclingFacts = () => {
    return (
      <div className="fact-section">
        <div className="factHeadDiv">
          <h2>Alkiline Batteries</h2>
          <p>
            This is a type of
            <span>Batteries</span>
            and it goes to
            <span>****</span>.
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
            It needs to be disposed of in a special place. Consult the location
            for more details.
          </p>
        </div>

        <div className="factFootDiv">
          <h2>Recycling Facts</h2>
          <p>
            It is a material commonly used for toys and small electronics and
            presents danger to humans and the environment when poorly stored and
            discarded.
          </p>
          <button>Explore</button>
        </div>
      </div>
    );
}

export default RecyclingFacts;