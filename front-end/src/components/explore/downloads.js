import React from 'react';

const Downlaods = () => {

    const downloadFile = (fileName) => {
        var anchor = document.createElement('a');
        anchor.href = './postcards/' + fileName;
        anchor.target = '_blank';
        anchor.download = fileName;
        anchor.click();
    }

    return (
        // Download Section
        <div className="download-section">

            {/* PostCard Download - 1 */}
            <div className="postcard-section">
                <div className="postcards postcard-one">
                    <img className="postcard-img" src="./images/explore/Explore_Selected-05.svg" alt="Please Recycle" />
                    <img className="postcard-img" src="./images/explore/Explore_Selected-06.svg" alt="Clean Vibes" />
                    <img className="postcard-img" src="./images/explore/Explore_Selected-07.svg" alt="Goodbye Waste" />
                    <img className="postcard-img" src="./images/explore/Explore_Selected-08.svg" alt="Keep the earth clean" />
                </div>
                <div className="postcard-download">
                    <span>Stickers</span>
                    <button onClick={() => downloadFile('ExploreStickers.zip')} className="button savy-green-button download-now-btn">
                        Download
                    </button>
                </div>
            </div>

            {/* PostCard Download - 2 */}
            <div className="postcard-section">
                <div className="postcards postcard-two">
                    <div className="postcard-details">
                        <img className="postcard-img" src="./images/icons/waste-recycled.svg" alt="" />
                        <div className="postcard-info">
                            <h5 className="postcard-title">Glass</h5>
                            <p className="postcard-description">
                                Glass bottles and jars are recycled into new glass containers, fiberglass insulation, paint for reflective signs, sand blast media and construction aggregate.
                            </p>
                        </div>
                    </div>
                    <div className="postcard-details">
                        <img className="postcard-img" src="./images/icons/waste-recycled.svg" alt="" />
                        <div className="postcard-info">
                            <h5 className="postcard-title">E-Waste</h5>
                            <p className="postcard-description">
                                The circuit boards contain a wide range of precious metals like gold, silver and platinum. These can be recycled into jewellery or mobile phone components.
                            </p>
                        </div>
                    </div>
                    <div className="postcard-details">
                        <img className="postcard-img" src="./images/icons/waste-recycled.svg" alt="" />
                        <div className="postcard-info">
                            <h5 className="postcard-title">Organic</h5>
                            <p className="postcard-description">
                                Organic waste could be turned into compost to grow crops, reducing dependency on chemical fertilizers, or clean organic waste could be used to feed animals
                            </p>
                        </div>
                    </div>
                </div>
                <div className="postcard-download">
                    <span>Postcards,</span>
                    <span>Printable PDF / Size A5</span>
                    <button onClick={() => downloadFile('Printable_PDF.pdf')} className="button savy-green-button download-now-btn">
                        Download
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Downlaods;