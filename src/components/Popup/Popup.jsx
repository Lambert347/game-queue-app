import React from 'react';
import './Popup.css';

const Popup = props => {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
            </div>
        </div>
    );
};

export default Popup;