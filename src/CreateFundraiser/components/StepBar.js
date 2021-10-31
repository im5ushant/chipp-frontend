import React from 'react';

import './StepBar.css';

const StepBar = props => {
    return(
        <>
            <div className="step-bar__step-counter">
               Step {props.step} of 5
            </div>
            <div className="step-bar__main-container">
                <div className={props.step>=1 ? "step-bar__bar filled":  "step-bar__bar"}></div>
                <div className={props.step>=2 ? "step-bar__bar filled":  "step-bar__bar"}></div>
                <div className={props.step>=3 ? "step-bar__bar filled":  "step-bar__bar"}></div>
                <div className={props.step>=4 ? "step-bar__bar filled":  "step-bar__bar"}></div>
                <div className={props.step>=5 ? "step-bar__bar filled":  "step-bar__bar"}></div>
            </div>
        </>
    );
};

export default StepBar;