import React from 'react';

import logo from './logo-error-page.svg';

const Loader = () => {
    return (
        <div className="wmLoaderComponent">
            <div className="loadingImageText">
                <img src={logo} alt="Logo" />
                <p>Loading ...</p>
            </div>
        </div>
    )
}

export default Loader;