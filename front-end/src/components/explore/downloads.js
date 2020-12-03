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

            {/* Sticker Download */}
            <div className="postcard-section">
                <div className="postcards postcard-one">
                    <img className="postcard-img" src="./images/explore/Explore_Selected-05.svg" alt="Please Recycle" />
                    <img className="postcard-img" src="./images/explore/Explore_Selected-06.svg" alt="Clean Vibes" />
                    <img className="postcard-img" src="./images/explore/Explore_Selected-07.svg" alt="Goodbye Waste" />
                    <img className="postcard-img" src="./images/explore/Explore_Selected-08.svg" alt="Keep the earth clean" />
                </div>
                <div className="postcard-download">
                    <span>Stickers</span>
                    <span>Printable</span>
                    <button onClick={() => downloadFile('Savy_stickers.zip')} className="button savy-green-button download-now-btn">
                        Download
                    </button>
                </div>
            </div>

            {/* Informative Sheet Download */}
            <div className="postcard-section">
                <div className="postcards postcard-two">
                    <img className="postcard-img" src="./images/explore/Thumbnail_Organic.svg" alt="Organic" />
                    <img className="postcard-img" src="./images/explore/Thumbnail_Paper.svg" alt="Paper" />
                    <img className="postcard-img" src="./images/explore/Thumbnail_Glass.svg" alt="Glass" />
                    <img className="postcard-img" src="./images/explore/Thumbnail_Container.svg" alt="Container" />
                </div>
                <div className="postcard-download">
                    <span>Informative Sheet,</span>
                    <span>Printable PDF / Size A5</span>
                    <button onClick={() => downloadFile('Savy_Info_Sheet.pdf')} className="button savy-green-button download-now-btn">
                        Download
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Downlaods;