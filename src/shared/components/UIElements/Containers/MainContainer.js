import React from 'react';

import './MainContainer.css';

const MainContainer = props => {
    
    return(<>
        <div className={`main-container__default ${props.classes}`}>
          {props.children}
        </div>
    </>)
}

export default MainContainer;